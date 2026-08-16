// ============================================================
// SCRIPT — вся логика калькулятора
// ============================================================

(function() {
  'use strict';

  // ---------- Сбор сырья из дерева ----------
  function collectRawFromTree(tree, multiplier) {
    const acc = {};

    function walk(node, mult) {
      if (node.type === 'raw') {
        const key = node.mat;
        acc[key] = (acc[key] || 0) + node.qty * mult;
      } else if (node.type === 'craft' && node.children) {
        const childMult = node.qty * mult;
        for (const child of node.children) {
          walk(child, childMult);
        }
      }
    }

    for (const node of tree) {
      walk(node, multiplier);
    }
    return acc;
  }

  // ---------- Суммарный raw для всех веток ----------
  function totalRawForAllBranches(branches, warheadQty) {
    const total = {};
    for (const branch of branches) {
      const mult = branch.qty * warheadQty;
      const raw = collectRawFromTree(branch.tree, mult);
      for (const [key, value] of Object.entries(raw)) {
        total[key] = (total[key] || 0) + value;
      }
    }
    return total;
  }

  // ---------- Отрисовка дерева (рекурсивная) ----------
  function renderTree(tree) {
    let html = '<ul class="tree">';

    for (const node of tree) {
      if (node.type === 'raw') {
        html += `
          <li class="raw">
            <div class="row">
              <i class="dot" style="background:${node.color}"></i>
              <span class="nm">${node.mat}</span>
              <span class="dash"></span>
              <span class="qt">×${node.qty.toLocaleString()}</span>
            </div>
          </li>
        `;
      } else if (node.type === 'craft') {
        html += `
          <li class="craft">
            <div class="row">
              <span class="nm">${node.name}</span>
              <span class="dash"></span>
              <span class="qt">×${node.qty.toLocaleString()}</span>
            </div>
        `;

        if (node.children && node.children.length) {
          html += '<ul>';
          for (const child of node.children) {
            if (child.type === 'raw') {
              html += `
                <li class="raw">
                  <div class="row">
                    <i class="dot" style="background:${child.color}"></i>
                    <span class="nm">${child.mat}</span>
                    <span class="dash"></span>
                    <span class="qt">×${child.qty.toLocaleString()}</span>
                  </div>
                </li>
              `;
            } else if (child.type === 'craft') {
              // рекурсивный вызов для вложенных крафтов
              html += `
                <li class="craft">
                  <div class="row">
                    <span class="nm">${child.name}</span>
                    <span class="dash"></span>
                    <span class="qt">×${child.qty.toLocaleString()}</span>
                  </div>
              `;
              if (child.children) {
                html += '<ul>';
                for (const grandchild of child.children) {
                  if (grandchild.type === 'raw') {
                    html += `
                      <li class="raw">
                        <div class="row">
                          <i class="dot" style="background:${grandchild.color}"></i>
                          <span class="nm">${grandchild.mat}</span>
                          <span class="dash"></span>
                          <span class="qt">×${grandchild.qty.toLocaleString()}</span>
                        </div>
                      </li>
                    `;
                  }
                }
                html += '</ul>';
              }
              html += '</li>';
            }
          }
          html += '</ul>';
        }
        html += '</li>';
      }
    }

    html += '</ul>';
    return html;
  }

  // ---------- Скалирование дерева (умножение всех количеств) ----------
  function scaleTree(node, scale) {
    if (node.type === 'raw') {
      return { ...node, qty: node.qty * scale };
    } else if (node.type === 'craft') {
      const cloned = {
        ...node,
        qty: node.qty * scale,
        children: []
      };
      if (node.children) {
        for (const child of node.children) {
          cloned.children.push(scaleTree(child, scale));
        }
      }
      return cloned;
    }
    return node;
  }

  // ---------- Основная функция обновления ----------
  function updateAll(warheadQty) {
    const { assembly, branches, intermediates, materialColors } = CRAFT_DATA;

    // 1. Assembly
    const assemblyContainer = document.getElementById('assembly');
    assemblyContainer.innerHTML = assembly.map(slot =>
      `<div class="slot">
        <span class="n">${slot.name}</span>
        <span class="q">×${(slot.qty * warheadQty).toLocaleString()}</span>
      </div>`
    ).join('');

    // 2. Branches
    const branchesContainer = document.getElementById('branchesContainer');
    let branchesHTML = '';

    for (const branch of branches) {
      const mult = branch.qty * warheadQty;
      const scaledTree = branch.tree.map(node => scaleTree(node, warheadQty));

      branchesHTML += `
        <section class="branch">
          <h2>${branch.name}</h2>
          <div class="bq">×${mult.toLocaleString()}</div>
          ${renderTree(scaledTree)}
        </section>
      `;
    }
    branchesContainer.innerHTML = branchesHTML;

    // 3. Intermediates (чипсы)
    const chipRow = document.getElementById('chipRow');
    chipRow.innerHTML = Object.entries(intermediates).map(([name, qty]) =>
      `<span class="chip">${name} <b>${(qty * warheadQty).toLocaleString()}</b></span>`
    ).join('');

    // 4. Raw materials
    const raw = totalRawForAllBranches(branches, warheadQty);
    const totalUnits = Object.values(raw).reduce((sum, v) => sum + v, 0);

    // 4a. Spectrum
    const spectrum = document.getElementById('spectrum');
    const sortedRaw = Object.entries(raw).sort((a, b) => b[1] - a[1]);
    spectrum.innerHTML = sortedRaw.map(([name, qty]) => {
      const pct = totalUnits > 0 ? (qty / totalUnits * 100) : 0;
      const color = materialColors[name] || '#888';
      return `<span style="width:${pct}%;background:${color}" title="${name} ${qty.toLocaleString()}"></span>`;
    }).join('');

    // 4b. Table
    const tableBody = document.getElementById('rawTableBody');
    tableBody.innerHTML = sortedRaw.map(([name, qty]) => {
      const pct = totalUnits > 0 ? (qty / totalUnits * 100) : 0;
      const color = materialColors[name] || '#888';
      return `
        <tr>
          <td class="mat">
            <i class="dot" style="background:${color}"></i>${name}
          </td>
          <td class="num r">${qty.toLocaleString()}</td>
          <td class="pct r">${pct.toFixed(1)} %</td>
        </tr>
      `;
    }).join('');

    // 4c. Total
    document.getElementById('rawTotal').textContent =
      `${totalUnits.toLocaleString()} единиц · ${Object.keys(raw).length} наименований`;
  }

  // ---------- Инициализация ----------
  const input = document.getElementById('warheadQty');

  input.addEventListener('input', function() {
    let val = parseInt(this.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    this.value = val;
    updateAll(val);
  });

  // Первый рендер
  updateAll(1);
})();