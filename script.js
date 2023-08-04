const armorEl = document.getElementById('armor');
const finalArmorEl = document.getElementById('finalArmor');
const mitigationEl = document.getElementById('mitigation');
const arpEl = document.getElementById('arp');
const majorDebuffEl = document.getElementById('majorDebuff');
const minorDebuffEl = document.getElementById('minorDebuff');
const shatteringDebuffEl = document.getElementById('shatteringDebuff');
const arpPercentEl = document.getElementById('arpPercent');

const bossArmor = 10643;
const reduceableCalcConst = 15232.5;
const arpRating = 13.99;
const maxArpInput = 1399;

const calculate = () => {
  let arp = parseFloat(arpEl.value);
  
  // Adjust ARP to maximum value if it's more than 1399
  arp = Math.min(arp, maxArpInput);
  
  let majorDebuff = majorDebuffEl.checked ? 0.20 : 0;
  let minorDebuff = minorDebuffEl.checked ? 0.05 : 0;
  let shatteringDebuff = shatteringDebuffEl.checked ? 0.20 : 0;

  let armorAfterDebuff = bossArmor * (1 - majorDebuff) * (1 - minorDebuff) * (1 - shatteringDebuff);
  let reduceableArmor = Math.min(armorAfterDebuff, (armorAfterDebuff + reduceableCalcConst) / 3);
  let armorPenetrated = arp ? reduceableArmor * (arp / arpRating / 100) : 0;

  let finalArmor = Math.max(0, armorAfterDebuff - armorPenetrated);
  let mitigation = finalArmor / (finalArmor + reduceableCalcConst) * 100;

  let totalArmorPenetrated = bossArmor - finalArmor;
  let arpPercent = totalArmorPenetrated / bossArmor * 100;

  armorEl.innerText = armorAfterDebuff.toFixed(2);
  finalArmorEl.innerText = finalArmor.toFixed(2);
  mitigationEl.innerText = mitigation.toFixed(2);
  arpPercentEl.innerText = arpPercent.toFixed(2);
};

arpEl.addEventListener('input', calculate);
majorDebuffEl.addEventListener('input', calculate);
minorDebuffEl.addEventListener('input', calculate);
shatteringDebuffEl.addEventListener('input', calculate);

calculate();
