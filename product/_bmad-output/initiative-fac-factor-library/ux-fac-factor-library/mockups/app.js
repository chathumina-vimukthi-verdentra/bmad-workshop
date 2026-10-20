(function () {
  'use strict';
  // Workshop sample values, not real emission factors.
  var FACTORS = [
    { id: 'EF-DIESEL-UK-2026.1', type: 'diesel', label: 'Diesel (road)', unit: 'litre', kg: '2.70', scope: 1 },
    { id: 'EF-PETROL-UK-2026.1', type: 'petrol', label: 'Petrol (road)', unit: 'litre', kg: '2.31', scope: 1 },
    { id: 'EF-NATURALGAS-UK-2026.1', type: 'natural_gas', label: 'Natural gas', unit: 'kWh', kg: '0.183', scope: 1 },
    { id: 'EF-LPG-UK-2026.1', type: 'lpg', label: 'LPG', unit: 'litre', kg: '1.56', scope: 1 },
    { id: 'EF-GRIDELEC-UK-2026.1', type: 'grid_electricity', label: 'Grid electricity (UK)', unit: 'kWh', kg: '0.207', scope: 2 },
    { id: 'EF-DISTRICTHEAT-UK-2026.1', type: 'district_heat', label: 'District heat', unit: 'kWh', kg: '0.150', scope: 2 }
  ].sort(function (a, b) { return a.label.localeCompare(b.label); });

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Factor library
  function renderFactors() {
    var s = $('scope-filter').value;
    var list = FACTORS.filter(function (f) { return !s || String(f.scope) === s; });
    $('factor-rows').innerHTML = list.map(function (f) {
      return '<tr><td><span class="fname">' + esc(f.label) + '</span><span class="fid">' + esc(f.id) + '</span></td>' +
        '<td class="mono">' + esc(f.type) + '</td><td>' + esc(f.unit) + '</td><td class="num">' + esc(f.kg) + '</td>' +
        '<td><span class="badge s' + f.scope + '">Scope ' + f.scope + '</span></td>' +
        '<td><span class="chip">v2026.1</span></td><td>2026-01-01</td></tr>';
    }).join('');
    $('factor-count').textContent = list.length + (list.length === 1 ? ' factor' : ' factors');
    $('factor-empty').hidden = list.length > 0;
  }
  $('scope-filter').addEventListener('change', renderFactors);
  $('clear-filter').addEventListener('click', function () { $('scope-filter').value = ''; renderFactors(); });

  renderFactors();
})();
