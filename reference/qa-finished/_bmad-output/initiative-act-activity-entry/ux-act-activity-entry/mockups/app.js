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

  var activities = [
    { id: 'ACT-0001', site: 'Depot 1', period: '2026-03', type: 'diesel', qty: '1200' },
    { id: 'ACT-0002', site: 'Depot 1', period: '2026-03', type: 'natural_gas', qty: '8000' },
    { id: 'ACT-0003', site: 'Depot 1', period: '2026-03', type: 'grid_electricity', qty: '15000' }
  ];
  function byType(t) { return FACTORS.filter(function (f) { return f.type === t; })[0]; }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Record activity
  FACTORS.forEach(function (f) {
    var o = document.createElement('option'); o.value = f.type; o.textContent = f.label; $('type').appendChild(o);
  });
  $('type').addEventListener('change', function () {
    var f = byType(this.value); $('unit').value = f ? f.unit : '';
  });
  var lastPeriod = '2026-03';
  function renderRecent() {
    var site = $('site').value.trim().toLowerCase(), period = $('period').value.trim();
    if (!/^\d{4}(-(0[1-9]|1[0-2]))?$/.test(period)) period = lastPeriod; else lastPeriod = period;
    var list = activities.filter(function (a) { return a.site.toLowerCase() === site && a.period === period; });
    $('recent-context').textContent = ($('site').value.trim() || 'No site') + ', ' + period;
    $('recent-rows').innerHTML = list.slice().reverse().map(function (a) {
      var f = byType(a.type);
      return '<tr><td class="mono">' + a.id + '</td><td>' + esc(f.label) + '</td><td class="num">' + esc(a.qty) + ' ' + f.unit + '</td></tr>';
    }).join('');
    $('recent-empty').hidden = list.length > 0;
  }
  function setErr(key, msg) {
    var box = $('f-' + key), p = $(key + '-err'), input = box.querySelector('input,select');
    box.classList.toggle('invalid', !!msg);
    p.hidden = !msg; p.textContent = msg || '';
    if (msg) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', key + '-err'); }
    else { input.removeAttribute('aria-invalid'); input.setAttribute('aria-describedby', key + '-help'); }
  }
  function validate() {
    var site = $('site').value.trim(), period = $('period').value.trim(), type = $('type').value, qty = $('qty').value.trim();
    var e = {};
    if (!site) e.site = 'Enter a site.';
    if (!period) e.period = 'Enter a period.'; else if (!/^\d{4}(-(0[1-9]|1[0-2]))?$/.test(period)) e.period = 'Use 2026 or 2026-03.';
    if (!type) e.type = 'Choose an activity type.';
    if (!qty) e.qty = 'Enter a quantity.'; else if (!/^-?\d+(\.\d+)?$/.test(qty)) e.qty = 'Quantity must be a number.'; else if (!(parseFloat(qty) > 0)) e.qty = 'Quantity must be greater than 0.';
    return e;
  }
  $('activity-form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    $('form-success').hidden = true;
    var e = validate(), keys = Object.keys(e);
    ['site', 'period', 'type', 'qty'].forEach(function (k) { setErr(k, e[k]); });
    if (keys.length) {
      $('form-error-text').textContent = keys.length === 1 ? 'Please fix the 1 problem below.' : 'Please fix the ' + keys.length + ' problems below.';
      $('form-error').hidden = false;
      var first = $('f-' + ['site', 'period', 'type', 'qty'].filter(function (k) { return e[k]; })[0]).querySelector('input,select');
      first.focus();
      return;
    }
    $('form-error').hidden = true;
    var btn = $('submit-btn'); btn.disabled = true; btn.textContent = 'Recording...';
    setTimeout(function () {
      var id = 'ACT-' + String(activities.length + 1).padStart(4, '0');
      activities.push({ id: id, site: $('site').value.trim(), period: $('period').value.trim(), type: $('type').value, qty: $('qty').value.trim() });
      btn.disabled = false; btn.textContent = 'Record activity';
      $('form-success-text').textContent = 'Activity ' + id + ' recorded.';
      $('form-success').hidden = false;
      $('qty').value = '';
      renderRecent();
    }, 350);
  });
  ['site', 'period'].forEach(function (k) { $(k).addEventListener('input', renderRecent); });

  // Demo hook for the screen export: ?demo=error pre-fills the error example.
  if (/demo=error/.test(location.search)) {
    $('period').value = '2026-3'; $('type').value = 'diesel'; $('unit').value = 'litre'; $('qty').value = '0';
    $('activity-form').requestSubmit();
  }
  renderRecent();
})();
