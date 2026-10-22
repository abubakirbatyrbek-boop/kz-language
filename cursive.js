// School cursive (пропись) for Kazakh and Russian, drawn as single pen lines.
// Glyphs are authored upright on a 40-unit x-height: baseline y=0, x-height −40, capitals and
// ascenders −80, descenders +40. Layout slants them and joins letters the way children are taught:
// each exit stroke flows into the next letter's lead-in, and after a top exit (о, в, ю…) the
// lead-in is skipped so the join runs along the top.
(() => {
  const SLANT = 0.4; // tan of the school slant (≈22° from vertical)
  const LEAD = 'M0,-8 C3,-20 7,-32 10,-40';
  const OVAL = 'M20,-35 C15,-41 4,-39 2,-25 C0,-12 3,-1 9,0 C15,1 19,-8 21,-18 L22,-40';
  const CAP = 'M0,-70 C2,-78 8,-80 12,-76 C14,-72 14,-60 13,-40';
  // From the stick at x down into the joining hook that ends at (x+14, −8).
  const hook = x => `L${x},-9 C${x},-3 ${x + 3},0 ${x + 7},0 C${x + 10},0 ${x + 12},-4 ${x + 14},-8`;
  // From the stick at a: round the bottom and climb to the top of the next stick at b.
  const up = (a, b) => `L${a},-10 C${a},-3 ${a + 3},0 ${a + 6},0 C${a + 10},0 ${b - 2},-14 ${b},-40`;
  // From the stick at a: back up from the baseline and arch over to the next stick at b.
  const arch = (a, b) => `L${a},0 C${a},-20 ${a + 4},-40 ${a + 9},-40 C${b - 1},-40 ${b},-36 ${b},-32`;
  // ц / щ / ң: a short tail below the baseline that loops back into the join.
  const tail = x => `L${x},-4 C${x},-1 ${x + 2},0 ${x + 5},0 L${x + 8},0 C${x + 9},5 ${x + 9},11 ${x + 6},15 C${x + 4},17 ${x + 2},14 ${x + 5},9 C${x + 8},4 ${x + 12},-3 ${x + 15},-8`;
  // д / у: the descender loop, closing across the baseline and leaving to the right.
  const loop = x => `L${x},24 C${x},36 ${x - 8},41 ${x - 13},37 C${x - 17},33 ${x - 12},24 ${x - 3},14 C${x + 3},8 ${x + 8},0 ${x + 13},-8`;
  const foot = x => `L${x},-8 C${x - 1},-2 ${x - 6},0 ${x - 9},-3`;
  const dot = (x, y) => `M${x},${y} L${x + 0.5},${y + 0.5}`;

  // w: advance, lead: lead-in stroke (skipped after a top join), s: pen strokes in order (the last one
  // ends at the exit), x: marks added afterwards (dots, breves, bars), j:0 = the next letter starts afresh.
  const G = {
    'а': {w: 36, s: [OVAL + ' ' + hook(22)]},
    'б': {w: 38, j: 0, s: ['M20,-34 C15,-41 4,-39 2,-25 C0,-12 3,-1 9,0 C16,1 22,-10 22,-24 C22,-46 24,-68 29,-75 C32,-79 36,-79 39,-77']},
    'в': {w: 30, s: ['M0,-8 C5,-28 10,-52 15,-62 C18,-68 13,-70 11,-62 C9,-50 8,-28 8,-10 C8,-3 11,0 16,0 C23,0 26,-7 25,-13 C24,-20 18,-23 12,-21 C18,-22 25,-27 30,-34']},
    'г': {w: 24, s: ['M1,-30 C4,-38 11,-42 16,-39 C20,-36 19,-31 17,-26 L11,-6 C9,0 13,1 17,-2 C20,-4 22,-6 24,-8']},
    'д': {w: 35, s: [OVAL + ' ' + loop(22)]},
    'е': {w: 25, s: ['M2,-16 C10,-15 20,-20 20,-30 C20,-38 14,-41 10,-40 C4,-39 1,-30 1,-21 C1,-8 6,0 13,0 C18,0 22,-4 25,-8']},
    'ж': {w: 34, s: ['M0,-34 C3,-40 8,-39 10,-32 C12,-25 12,-14 10,-8 C8,-2 4,0 1,-2', 'M15,-40 L15,0', 'M29,-35 C25,-40 19,-34 18,-26 C17,-16 19,-4 24,-1 C28,1 32,-3 34,-8']},
    'з': {w: 30, s: ['M2,-34 C6,-40 15,-42 18,-35 C21,-28 15,-21 8,-21 C17,-21 22,-12 20,0 C18,14 14,30 9,36 C5,41 0,37 3,30 C7,21 20,6 30,-8']},
    'и': {w: 39, lead: LEAD, s: ['M10,-40 ' + up(10, 25) + ' ' + hook(25)]},
    'к': {w: 37, lead: LEAD, s: ['M10,-40 L10,0', 'M28,-37 C24,-40 18,-32 12,-22 C18,-24 21,-16 22,-8 C23,-2 27,0 30,0 C33,0 35,-4 37,-8']},
    'л': {w: 38, s: ['M0,-6 C4,-6 7,-10 9,-16 C12,-28 15,-39 20,-40 C23,-41 24,-38 24,-34 ' + hook(24)]},
    'м': {w: 53, s: ['M0,-6 C4,-6 7,-10 9,-16 C12,-28 15,-39 20,-40 C23,-41 24,-38 24,-34 L24,0 C26,-14 30,-40 35,-40 C38,-40 39,-37 39,-33 ' + hook(39)]},
    'н': {w: 39, lead: LEAD, s: ['M10,-40 L10,0', 'M10,-21 C15,-19 22,-22 25,-40 ' + hook(25)]},
    'о': {w: 28, s: ['M18,-38 C11,-41 2,-34 1,-22 C0,-9 5,0 11,0 C18,0 22,-11 22,-22 C22,-32 18,-40 12,-40 C10,-40 9,-38 11,-37 C15,-35 22,-34 28,-35']},
    'п': {w: 39, lead: LEAD, s: ['M10,-40 ' + arch(10, 25) + ' ' + hook(25)]},
    'р': {w: 41, lead: LEAD, s: ['M10,-40 L10,38 L10,-28 C13,-38 18,-41 22,-40 C26,-39 27,-34 27,-30 ' + hook(27)]},
    'с': {w: 25, s: ['M18,-33 C20,-36 19,-40 15,-40 C8,-40 1,-32 1,-21 C1,-8 6,0 13,0 C18,0 22,-4 25,-8']},
    'т': {w: 52, lead: LEAD, s: ['M10,-40 ' + arch(10, 24) + ' ' + arch(24, 38) + ' ' + hook(38)]},
    'у': {w: 38, lead: LEAD, s: ['M10,-40 ' + up(10, 25) + ' ' + loop(25)]},
    'ф': {w: 39, s: ['M17,-34 C12,-40 3,-38 2,-25 C1,-12 6,-1 12,-1 C15,-1 17,-4 18,-8', 'M20,-76 L18,38', 'M19,-6 C21,-2 27,0 31,-4 C36,-10 37,-26 33,-35 C30,-41 23,-40 20,-34 C25,-32 31,-34 39,-36']},
    'х': {w: 30, s: ['M0,-34 C3,-40 8,-40 11,-34 L19,-6 C21,0 26,0 30,-8'], x: ['M25,-38 L5,-2']},
    'ц': {w: 40, lead: LEAD, s: ['M10,-40 ' + up(10, 25) + ' ' + tail(25)]},
    'ч': {w: 40, s: ['M2,-32 C3,-38 6,-40 8,-40 C11,-40 11,-36 11,-32 L11,-24 C11,-17 15,-15 20,-16 C23,-17 25,-25 26,-40 ' + hook(26)]},
    'ш': {w: 54, lead: LEAD, s: ['M10,-40 ' + up(10, 25) + ' ' + up(25, 40) + ' ' + hook(40)]},
    'щ': {w: 55, lead: LEAD, s: ['M10,-40 ' + up(10, 25) + ' ' + up(25, 40) + ' ' + tail(40)]},
    'ъ': {w: 29, s: ['M0,-36 C3,-40 8,-41 10,-38 L10,-8 C10,-2 13,0 17,0 C24,0 27,-6 26,-12 C25,-19 18,-22 11,-17 C15,-13 22,-12 29,-14']},
    'ы': {w: 45, lead: LEAD, s: ['M10,-40 L10,-8 C10,-2 13,0 17,0 C24,0 27,-6 26,-12 C25,-19 18,-22 11,-17 C16,-18 26,-28 31,-40 ' + hook(31)]},
    'ь': {w: 29, lead: LEAD, s: ['M10,-40 L10,-8 C10,-2 13,0 17,0 C24,0 27,-6 26,-12 C25,-19 18,-22 11,-17 C15,-13 22,-12 29,-14']},
    'э': {w: 24, j: 0, s: ['M2,-34 C6,-40 16,-41 20,-32 C23,-22 21,-8 13,-1 C8,2 3,-1 1,-4'], x: ['M8,-20 L21,-20']},
    'ю': {w: 44, lead: LEAD, s: ['M10,-40 L10,0 L10,-20 C14,-21 20,-30 25,-38 C27,-41 22,-41 19,-34 C16,-26 17,-6 26,-1 C33,2 38,-10 38,-22 C38,-32 34,-40 29,-40 C27,-40 26,-38 28,-37 C32,-35 38,-34 44,-35']},
    'я': {w: 36, s: ['M21,-34 C18,-41 7,-41 5,-32 C3,-24 10,-20 16,-21 C10,-18 4,-8 1,-2 C0,1 3,1 5,-1 C10,-8 18,-26 22,-40 ' + hook(22)]},
    'ә': {w: 24, s: ['M2,-34 C6,-40 16,-41 20,-32 C23,-22 21,-8 13,-1 C8,2 2,-2 2,-10 C2,-17 10,-21 22,-20']},
    'қ': {w: 37, lead: LEAD, s: ['M10,-40 L10,0', 'M28,-37 C24,-40 18,-32 12,-22 C18,-24 21,-16 22,-6 C22,-2 24,0 27,0 L30,0 C31,5 31,11 28,15 C26,17 24,14 27,9 C30,4 34,-3 37,-8']},
    'ң': {w: 40, lead: LEAD, s: ['M10,-40 L10,0', 'M10,-21 C15,-19 22,-22 25,-40 ' + tail(25)]},
    'ү': {w: 30, j: 0, lead: LEAD, s: ['M10,-40 ' + up(10, 25) + ' L25,38']},
    'һ': {w: 39, s: ['M0,-8 C6,-30 11,-60 14,-72 C16,-80 10,-81 9,-72 L8,0 C10,-20 14,-40 20,-40 C24,-40 25,-36 25,-32 ' + hook(25)]},
    'і': {w: 24, lead: LEAD, s: ['M10,-40 ' + hook(10)], x: [dot(10, -54)]},

    'А': {w: 51, s: ['M0,-4 C5,-4 9,-8 12,-20 C17,-40 24,-72 32,-79 C35,-81 37,-78 37,-74 ' + hook(37)], x: ['M15,-32 L37,-32']},
    'Б': {w: 40, j: 0, s: ['M4,-72 C12,-80 28,-82 40,-76', 'M20,-78 C17,-50 14,-26 13,-10 C12,-2 16,1 21,0 C31,-1 36,-10 34,-20 C32,-30 23,-34 15,-30']},
    'В': {w: 38, j: 0, s: ['M16,-78 C14,-50 12,-24 11,-8 C10,-1 4,-1 3,-5', 'M8,-70 C14,-80 34,-82 34,-64 C34,-52 24,-44 16,-44 C30,-44 38,-34 37,-20 C36,-6 26,0 16,0 C10,0 6,-2 4,-4']},
    'Г': {w: 40, j: 0, s: ['M2,-70 C10,-80 26,-80 40,-76', 'M22,-78 C20,-50 16,-22 14,-8 C12,0 6,0 3,-4']},
    'Д': {w: 46, j: 0, s: ['M26,-78 C22,-50 17,-24 13,-9 C10,1 1,3 1,-2 C1,-7 10,-6 18,-2 C24,1 36,0 42,-14 C48,-30 48,-56 40,-70 C34,-80 22,-82 14,-76']},
    'Е': {w: 38, s: ['M30,-72 C26,-80 12,-80 10,-68 C8,-56 18,-46 24,-44 C12,-44 2,-36 2,-20 C2,-6 12,0 20,0 C28,0 34,-4 38,-8']},
    'Ж': {w: 51, s: ['M0,-70 C4,-80 14,-78 18,-62 C21,-48 20,-22 14,-8 C10,0 2,0 0,-4', 'M25,-80 L25,0', 'M48,-72 C42,-80 34,-70 32,-52 C30,-30 34,-4 42,-1 C46,0 49,-4 51,-8']},
    'З': {w: 36, j: 0, s: ['M4,-70 C10,-80 30,-82 32,-66 C33,-54 22,-44 14,-44 C28,-44 36,-34 35,-20 C34,-6 24,0 14,0 C8,0 3,-3 2,-8']},
    'И': {w: 52, s: [CAP + ' L12,-10 C12,-3 15,0 20,0 C28,0 34,-30 38,-80 ' + hook(38)]},
    'К': {w: 48, s: [CAP + ' ' + foot(12), 'M44,-76 C38,-80 28,-64 15,-40 C25,-44 31,-30 33,-12 C34,-3 37,0 41,0 C44,0 46,-4 48,-8']},
    'Л': {w: 54, s: ['M0,-4 C6,-4 10,-12 14,-26 C20,-50 26,-76 34,-79 C38,-80 40,-77 40,-72 ' + hook(40)]},
    'М': {w: 72, s: ['M0,-4 C6,-4 10,-12 14,-26 C20,-50 26,-78 32,-79 C36,-80 37,-76 37,-70 L36,0 C40,-30 46,-78 54,-79 C57,-80 58,-76 58,-70 ' + hook(58)]},
    'Н': {w: 52, s: [CAP + ' ' + foot(12), 'M13,-38 C24,-38 34,-46 38,-80 ' + hook(38)]},
    'О': {w: 42, s: ['M30,-76 C22,-82 6,-76 3,-54 C0,-30 6,-2 18,0 C30,2 38,-16 38,-40 C38,-62 30,-80 22,-80 C18,-80 17,-76 20,-74 C26,-70 34,-70 42,-72']},
    'П': {w: 54, s: [CAP + ' ' + foot(12), 'M8,-74 C20,-82 38,-82 40,-70 ' + hook(40)]},
    'Р': {w: 40, j: 0, s: ['M16,-76 L13,-8 C12,-2 7,0 4,-3', 'M6,-66 C12,-80 36,-82 38,-64 C40,-48 26,-40 14,-44']},
    'С': {w: 40, s: ['M34,-66 C36,-72 34,-80 26,-80 C12,-80 2,-62 2,-40 C2,-14 12,0 24,0 C32,0 36,-4 40,-8']},
    'Т': {w: 62, s: [CAP + ' ' + foot(12), 'M31,-78 C30,-50 29,-24 28,-8 C27,-1 23,0 20,-3', 'M50,-78 C49,-50 48,-24 48,-9 C48,-3 51,0 55,0 C58,0 60,-4 62,-8'], x: ['M2,-72 C16,-82 36,-78 56,-80']},
    'У': {w: 44, s: ['M0,-70 C2,-78 8,-80 12,-76 C14,-72 14,-60 13,-48 L12,-40 C12,-32 15,-28 20,-28 C28,-28 34,-50 38,-80 L38,10 C38,30 28,42 18,38 C10,34 16,22 28,12 C34,6 40,-2 44,-8']},
    'Ф': {w: 50, j: 0, s: ['M30,-82 L25,0', 'M26,-66 C18,-70 2,-64 2,-44 C2,-26 14,-20 26,-24 C38,-28 50,-36 50,-52 C50,-66 40,-72 30,-68']},
    'Х': {w: 44, s: ['M0,-70 C4,-80 14,-80 18,-68 L30,-12 C32,-2 38,0 44,-8'], x: ['M40,-74 L10,-4']},
    'Ц': {w: 53, s: [CAP + ' L12,-10 C12,-3 15,0 20,0 C28,0 34,-30 38,-80 ' + tail(38)]},
    'Ч': {w: 52, s: ['M0,-66 C2,-76 8,-80 12,-78 C15,-76 15,-70 15,-64 L15,-50 C15,-38 20,-34 26,-34 C32,-35 36,-50 38,-80 ' + hook(38)]},
    'Ш': {w: 74, s: [CAP + ' L12,-10 C12,-3 15,0 20,0 C28,0 34,-30 36,-80 L36,-10 C36,-3 39,0 44,0 C52,0 58,-30 60,-80 ' + hook(60)]},
    'Щ': {w: 75, s: [CAP + ' L12,-10 C12,-3 15,0 20,0 C28,0 34,-30 36,-80 L36,-10 C36,-3 39,0 44,0 C52,0 58,-30 60,-80 ' + tail(60)]},
    'Ъ': {w: 42, s: ['M0,-70 C6,-78 14,-80 20,-78', 'M20,-80 C18,-50 16,-20 15,-8 C15,-1 19,1 25,0 C37,-1 43,-12 41,-24 C39,-36 27,-42 16,-36 C24,-32 34,-30 42,-32']},
    'Ы': {w: 62, s: [CAP + ' L12,-8 C12,-1 16,1 22,0 C34,-1 40,-12 38,-24 C36,-36 24,-42 13,-36', 'M48,-80 ' + hook(48)]},
    'Ь': {w: 40, s: [CAP + ' L12,-8 C12,-1 16,1 22,0 C34,-1 40,-12 38,-24 C36,-36 24,-42 13,-36 C21,-32 31,-30 40,-32']},
    'Э': {w: 40, j: 0, s: ['M2,-66 C8,-80 30,-82 36,-60 C40,-40 36,-10 22,-1 C14,4 4,0 2,-8'], x: ['M14,-40 L37,-40']},
    'Ю': {w: 58, s: [CAP + ' ' + foot(12), 'M13,-40 L24,-40', 'M48,-74 C42,-82 28,-78 26,-56 C24,-30 30,-2 40,0 C50,2 56,-18 56,-40 C56,-62 50,-80 42,-80 C38,-80 38,-76 41,-74 C46,-72 52,-72 58,-74']},
    'Я': {w: 52, s: ['M36,-66 C32,-80 14,-82 10,-66 C6,-52 18,-42 28,-44 C18,-40 8,-20 4,-6 C2,0 6,1 8,-2 C14,-12 30,-50 38,-80 ' + hook(38)]},
    'Ә': {w: 42, j: 0, s: ['M4,-66 C10,-80 32,-82 38,-60 C42,-40 38,-10 24,-1 C14,4 4,-2 4,-18 C4,-32 18,-42 40,-40']},
    'Қ': {w: 51, s: [CAP + ' ' + foot(12), 'M44,-76 C38,-80 28,-64 15,-40 C25,-44 31,-30 33,-10 C33,-3 35,0 38,0 L41,0 C42,6 42,14 38,18 C35,20 33,16 37,10 C41,4 45,-2 48,-8']},
    'Ң': {w: 53, s: [CAP + ' ' + foot(12), 'M13,-38 C24,-38 34,-46 38,-80 ' + tail(38)]},
    'Ү': {w: 40, j: 0, s: ['M0,-70 C2,-78 8,-80 12,-76 C14,-72 14,-60 13,-48 L12,-40 C12,-32 15,-28 20,-28 C28,-28 34,-50 38,-80 L37,-8 C36,-2 32,0 29,-3']},
    'Һ': {w: 50, s: ['M0,-4 C6,-4 10,-20 14,-40 C18,-60 20,-78 16,-80 C12,-82 10,-74 10,-60 L10,0 C14,-24 20,-40 28,-40 C34,-40 36,-34 36,-28 ' + hook(36)]},
    'І': {w: 26, s: [CAP + ' ' + hook(12)]},

    '-': {w: 14, j: 0, s: ['M2,-18 L12,-18']},
    '.': {w: 7, j: 0, s: [dot(2, -1)]},
    ',': {w: 7, j: 0, s: ['M3,-1 C3,2 2,5 0,8']},
    '!': {w: 10, j: 0, s: ['M7,-78 L3,-14'], x: [dot(2, -1)]},
    '?': {w: 22, j: 0, s: ['M2,-34 C4,-40 16,-42 17,-33 C18,-26 10,-22 9,-12'], x: [dot(8, -1)]}
  };
  // Letters that differ from another only by a mark.
  const alias = (to, from, ...marks) => { G[to] = {...G[from], x: [...(G[from].x || []), ...marks]}; };
  alias('ё', 'е', dot(7, -50), dot(16, -50));
  alias('й', 'и', 'M15,-52 C17,-47 22,-47 24,-52');
  alias('ғ', 'г', 'M6,-17 L22,-17');
  alias('ө', 'о', 'M3,-20 L21,-20');
  alias('ұ', 'ү', 'M17,10 L33,10');
  alias('Ё', 'Е', dot(16, -90), dot(26, -90));
  alias('Й', 'И', 'M24,-92 C26,-86 32,-86 34,-92');
  alias('Ғ', 'Г', 'M8,-36 L32,-36');
  alias('Ө', 'О', 'M4,-40 L37,-40');
  alias('Ұ', 'Ү', 'M26,-16 L46,-16');

  // ---- geometry: paths become lists of cubic segments [p0, p1, p2, p3]
  const parsed = new Map();
  function parse(d) {
    if (parsed.has(d)) return parsed.get(d);
    const tok = d.match(/[MLC]|-?\d*\.?\d+/g), segs = [];
    let i = 0, cmd = '', cur = [0, 0];
    const num = () => Number(tok[i++]);
    while (i < tok.length) {
      if (/[MLC]/.test(tok[i])) cmd = tok[i++];
      if (cmd === 'M') { cur = [num(), num()]; cmd = 'L'; if (!/[MLC]/.test(tok[i] || 'M')) continue; }
      else if (cmd === 'L') { const p = [num(), num()]; segs.push([cur, lerp(cur, p, 1 / 3), lerp(cur, p, 2 / 3), p]); cur = p; }
      else if (cmd === 'C') { const a = [num(), num()], b = [num(), num()], p = [num(), num()]; segs.push([cur, a, b, p]); cur = p; }
    }
    // A lone "M" (a dot) still needs one tiny segment to draw.
    if (!segs.length) segs.push([cur, cur, cur, [cur[0] + 0.5, cur[1] + 0.5]]);
    parsed.set(d, segs);
    return segs;
  }
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const len = v => Math.hypot(v[0], v[1]);
  const unit = v => { const l = len(v) || 1; return [v[0] / l, v[1] / l]; };
  const move = (segs, dx) => segs.map(s => s.map(p => [p[0] + dx, p[1]]));
  const startDir = segs => { const s = segs[0]; return unit(len(sub(s[1], s[0])) > 0.01 ? sub(s[1], s[0]) : sub(s[2], s[0])); };
  const endDir = segs => { const s = segs[segs.length - 1]; return unit(len(sub(s[3], s[2])) > 0.01 ? sub(s[3], s[2]) : sub(s[3], s[1])); };
  const slant = p => [p[0] - SLANT * p[1], p[1]];
  const bez = (s, t) => { const u = 1 - t; return [0, 1].map(k => u * u * u * s[0][k] + 3 * u * u * t * s[1][k] + 3 * u * t * t * s[2][k] + t * t * t * s[3][k]); };

  // Lay a line of text out as pen strokes in drawing order: {kind, segs} with segs already slanted.
  function layout(text) {
    const strokes = [];
    let x = 0, exit = null; // exit = {p, dir} of the previous letter, or null after a pen lift
    const add = (kind, segs) => strokes.push({kind, segs});
    for (const ch of text) {
      const g = G[ch];
      if (!g) { x += ch === ' ' ? 18 : 12; exit = null; continue; }
      const main = g.s.map(d => move(parse(d), x));
      const lead = g.lead ? move(parse(g.lead), x) : null;
      const skipLead = lead && exit && exit.p[1] < -24;
      const into = lead && !skipLead ? lead : main[0];
      if (exit) {
        const T = into[0][0], E = exit.p, k = Math.min(len(sub(T, E)) * 0.5, 16);
        if (len(sub(T, E)) > 0.8) {
          const tT = startDir(into);
          add('join', [[E, [E[0] + exit.dir[0] * k, E[1] + exit.dir[1] * k], [T[0] - tT[0] * k, T[1] - tT[1] * k], T]]);
        }
      }
      if (lead && !skipLead) add('lead', lead);
      main.forEach(m => add('main', m));
      (g.x || []).forEach(d => add('mark', move(parse(d), x)));
      const last = main[main.length - 1];
      exit = g.j === 0 ? null : {p: last[last.length - 1][3], dir: endDir(last)};
      x += g.w + 3;
    }
    let minX = Infinity, maxX = -Infinity;
    for (const s of strokes) {
      s.segs = s.segs.map(seg => seg.map(slant));
      s.d = 'M' + s.segs[0][0].map(r).join(',') + s.segs.map(seg => ' C' + seg.slice(1).map(p => p.map(r).join(',')).join(' ')).join('');
      s.pts = [];
      for (const seg of s.segs) {
        const n = Math.max(2, Math.ceil((len(sub(seg[1], seg[0])) + len(sub(seg[2], seg[1])) + len(sub(seg[3], seg[2]))) / 1.5));
        for (let t = 0; t <= n; t++) s.pts.push(bez(seg, t / n));
      }
      for (const p of s.pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); }
    }
    if (!strokes.length) { minX = 0; maxX = 40; }
    return {strokes, minX, maxX};
  }
  const r = v => Math.round(v * 10) / 10;
  const supported = word => /\S/.test(word) && [...word].every(ch => ch === ' ' || G[ch]);

  // One practice row: school lines, then the word as ink, as dotted tracing guide, or not at all.
  const TOP = -98, BOTTOM = 48;
  function rowSvg(lay, {ink = 'model', pad = 10} = {}) {
    // The school lines run on past the word, across the whole box (fitRow widens the viewBox).
    const x0 = Math.floor(lay.minX - pad), w = Math.ceil(lay.maxX + pad) - x0, h = BOTTOM - TOP, x1 = x0 + 2400;
    const slants = [];
    for (let sx = Math.ceil(x0 / 24) * 24; sx < x1; sx += 24) slants.push(`M${sx + SLANT * 40},40 L${sx - SLANT * 80},-80`);
    const lines = `<path class="cw-slant" d="${slants.join(' ')}"/><path class="cw-line faint" d="M${x0},-80 H${x1} M${x0},40 H${x1}"/><path class="cw-line" d="M${x0},-40 H${x1} M${x0},0 H${x1}"/>`;
    const body = ink === 'none' ? '' : `<g class="cw-${ink}">${lay.strokes.map(s => `<path d="${s.d}"/>`).join('')}</g>`;
    return {html: `<svg class="cw-row" viewBox="${x0} ${TOP} ${w} ${h}" preserveAspectRatio="xMinYMid meet" aria-hidden="true">${lines}${body}<circle class="cw-pen" r="3.4" cx="0" cy="0" style="display:none"/></svg>`, x0, w, h};
  }

  // Draw the strokes of a rendered row one after another, with a small pause at every pen lift.
  function animate(svg, {onDone} = {}) {
    const paths = [...svg.querySelectorAll('.cw-model path, .cw-ghost path')], pen = svg.querySelector('.cw-pen');
    if (svg._cwStop) svg._cwStop();
    const lens = paths.map(p => p.getTotalLength());
    // A single letter is drawn slowly; a long word speeds up so it never takes much more than 5 s.
    const speed = Math.max(130, lens.reduce((a, b) => a + b, 0) / 5);
    let at = 0;
    const plan = paths.map((p, i) => {
      const prev = paths[i - 1], gap = prev && dist(prev.getPointAtLength(lens[i - 1]), p.getPointAtLength(0)) > 1 ? 260 : 0;
      const start = at + gap, dur = Math.max(60, lens[i] / speed * 1000);
      at = start + dur;
      p.style.strokeDasharray = lens[i] + ' ' + (lens[i] + 1); p.style.strokeDashoffset = lens[i];
      return {p, start, dur, l: lens[i]};
    });
    pen.style.display = '';
    let raf, t0 = performance.now(), stopped = false;
    const frame = now => {
      const t = now - t0;
      let cur = null;
      for (const s of plan) {
        const f = Math.min(1, Math.max(0, (t - s.start) / s.dur));
        s.p.style.strokeDashoffset = s.l * (1 - f);
        if (t >= s.start) cur = {s, f};
      }
      if (cur) { const q = cur.s.p.getPointAtLength(cur.s.l * cur.f); pen.setAttribute('cx', q.x); pen.setAttribute('cy', q.y); }
      if (t < at + 120) raf = requestAnimationFrame(frame); else finish();
    };
    const finish = () => { if (stopped) return; stopped = true; cancelAnimationFrame(raf); pen.style.display = 'none'; plan.forEach(s => { s.p.style.strokeDasharray = ''; s.p.style.strokeDashoffset = ''; }); svg._cwStop = null; onDone?.(); };
    svg._cwStop = finish;
    raf = requestAnimationFrame(frame);
    return finish;
  }
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  // ---- practice panel: watch the strokes, trace the dotted word, write it alone, read handwriting
  const MAX_SCALE = 1.1; // px per unit at most: x-height ≈ 44 px
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Words of a phrase without punctuation, keeping only those every letter of which has a glyph.
  const wordsOf = text => String(text || '').split(/\s+/).map(w => w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')).filter(w => w && supported(w));

  // A row that keeps its proportions, as large as the box allows.
  function fitRow(box, row, canvas) {
    const svg = box.querySelector('svg'), W = box.clientWidth || row.w;
    const s = Math.min(MAX_SCALE, W / row.w), vw = Math.max(row.w, W / s);
    svg.setAttribute('viewBox', `${row.x0} ${TOP} ${vw} ${row.h}`);
    svg.style.width = vw * s + 'px'; svg.style.height = row.h * s + 'px';
    if (canvas) { canvas.style.width = vw * s + 'px'; canvas.style.height = row.h * s + 'px'; }
    return s;
  }

  // Drawing on a canvas laid over a row; points are kept in glyph units so they can be compared.
  function pad(box, row, onInk) {
    const cv = box.querySelector('canvas'), ctx = cv.getContext('2d');
    let s = 1, strokes = [], cur = null, missed = [];
    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.setTransform(dpr * s, 0, 0, dpr * s, -row.x0 * dpr * s, -TOP * dpr * s);
      ctx.lineCap = ctx.lineJoin = 'round'; ctx.lineWidth = 3.2; ctx.strokeStyle = getComputedStyle(cv).color;
      for (const st of strokes) {
        ctx.beginPath(); ctx.moveTo(st[0][0], st[0][1]);
        st.forEach(p => ctx.lineTo(p[0], p[1])); if (st.length === 1) ctx.lineTo(st[0][0] + 0.1, st[0][1]);
        ctx.stroke();
      }
      ctx.fillStyle = getComputedStyle(cv).getPropertyValue('--cw-miss') || '#b3261e';
      for (const p of missed) { ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, 7); ctx.fill(); }
    };
    const size = () => {
      lastW = box.clientWidth; s = fitRow(box, row, cv);
      const dpr = window.devicePixelRatio || 1;
      cv.width = Math.round(cv.getBoundingClientRect().width * dpr); cv.height = Math.round(row.h * s * dpr);
      draw();
    };
    const at = e => { const r = cv.getBoundingClientRect(); return [row.x0 + (e.clientX - r.left) / s, TOP + (e.clientY - r.top) / s]; };
    cv.addEventListener('pointerdown', e => { e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch {} cur = [at(e)]; strokes.push(cur); missed = []; draw(); onInk?.(); });
    cv.addEventListener('pointermove', e => { if (!cur) return; const list = e.getCoalescedEvents?.(); for (const ev of list && list.length ? list : [e]) cur.push(at(ev)); draw(); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => cv.addEventListener(t, () => { cur = null; }));
    let lastW = -1;
    const ro = new ResizeObserver(() => { if (box.clientWidth !== lastW) size(); });
    ro.observe(box); size();
    return {
      clear() { strokes = []; missed = []; draw(); },
      strokes: () => strokes,
      showMissed(m) { missed = m; draw(); },
      stop() { ro.disconnect(); }
    };
  }

  // How much of the word the ink covers, and how much ink wanders off it (both in glyph units).
  function compare(lay, strokes) {
    const ink = [];
    for (const st of strokes) st.forEach((a, i) => {
      ink.push(a);
      const b = st[i + 1]; if (!b) return;
      const n = Math.floor(Math.hypot(b[0] - a[0], b[1] - a[1]) / 1.5);
      for (let k = 1; k < n; k++) ink.push(lerp(a, b, k / n));
    });
    if (ink.length < 8) return null;
    const target = lay.strokes.flatMap(st => st.pts);
    const near = (p, set, tol) => { const t2 = tol * tol; return set.some(q => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 < t2); };
    const missed = target.filter(p => !near(p, ink, 6));
    return {cover: 1 - missed.length / target.length, stray: ink.filter(p => !near(p, target, 8)).length / ink.length, missed};
  }

  // host: an empty <details>. items: words or short phrases to practise. pool: printed words the learner
  // has met, for the reading quiz (left out when fewer than four). lang: 'kk' or 'ru'.
  function panel(host, {items, pool = [], lang = 'kk'}) {
    items = [...new Set(items.filter(t => t && supported(t)))];
    if (!items.length) { host.hidden = true; return; }
    const quizPool = [...new Set(pool.filter(w => w && supported(w)))];
    const canQuiz = quizPool.length >= 4;
    const tabs = [['trace', '描红'], ['write', '自己写'], ...(canQuiz ? [['read', '认手写']] : [])];
    host.classList.add('study-tool', 'hw-tool');
    host.innerHTML = `<summary><span class="hw-mark" aria-hidden="true">✍</span><span class="hw-sum"><b>手写练习</b><small>学校连写体（пропись）· ${tabs.map(t => t[1]).join(' · ')}</small></span></summary><div class="hw-body"></div>`;
    let built = false, word = items[0], tab = 'trace', cleanup = () => {};
    const done = new Set();
    host.addEventListener('toggle', () => { if (host.open && !built) { built = true; build(); } });

    function build() {
      const body = host.querySelector('.hw-body');
      body.innerHTML = `${items.length > 1 ? `<div class="hw-words" role="group" aria-label="选择要练的词">${items.map((t, i) => `<button type="button" class="hw-chip" data-i="${i}" aria-pressed="${i === 0}" lang="${lang}">${esc(t)}</button>`).join('')}</div>` : ''}<div class="hw-tabs" role="tablist" aria-label="练习方式">${tabs.map(([k, l]) => `<button type="button" role="tab" data-tab="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}</div><div class="hw-pane" role="tabpanel"></div>`;
      body.querySelectorAll('.hw-chip').forEach(b => b.onclick = () => {
        word = items[+b.dataset.i];
        body.querySelectorAll('.hw-chip').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        if (tab === 'read') tab = 'trace', syncTabs();
        render(true);
      });
      body.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; syncTabs(); render(false); });
      render(!reduceMotion());
    }
    function syncTabs() {
      host.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
      host.querySelector('.hw-words')?.toggleAttribute('hidden', tab === 'read');
    }
    function render(autoplay) {
      cleanup();
      const pane = host.querySelector('.hw-pane');
      if (tab === 'read') return quiz(pane);
      const lay = layout(word), model = rowSvg(lay, {ink: 'model'}), guide = rowSvg(lay, {ink: tab === 'trace' ? 'ghost' : 'compare'});
      pane.innerHTML = `<div class="hw-head"><span class="hw-print" lang="${lang}">${esc(word)}</span><button type="button" class="hw-play" data-play>▶ 看笔顺</button></div>
        <div class="hw-rowbox" data-model>${model.html}</div>
        <p class="hw-cue">${tab === 'trace' ? '沿着虚线描，从左到右，一笔连着写。' : '不看虚线，照着上面的范字自己写一遍。'}</p>
        <div class="hw-rowbox hw-pad" data-pad>${guide.html}<canvas class="hw-ink" aria-label="${tab === 'trace' ? '描红区' : '书写区'}：用手指、触控笔或鼠标书写"></canvas></div>
        <div class="hw-actions"><button type="button" data-clear>清除重写</button>${tab === 'trace' ? '<button type="button" class="hw-primary" data-check>检查描红</button>' : '<button type="button" class="hw-primary" data-compare aria-pressed="false">和范字对照</button>'}</div>
        <p class="study-status" role="status"></p>`;
      const modelBox = pane.querySelector('[data-model]'), padBox = pane.querySelector('[data-pad]'), status = pane.querySelector('[role=status]');
      const modelSvg = modelBox.querySelector('svg');
      const fitModel = () => fitRow(modelBox, model);
      const ro = new ResizeObserver(fitModel); ro.observe(modelBox); fitModel();
      const p = pad(padBox, guide, () => { status.textContent = ''; });
      const play = () => animate(modelSvg);
      pane.querySelector('[data-play]').onclick = play;
      pane.querySelector('[data-clear]').onclick = () => { p.clear(); status.textContent = ''; padBox.classList.remove('show-compare'); pane.querySelector('[data-compare]')?.setAttribute('aria-pressed', 'false'); };
      const check = pane.querySelector('[data-check]');
      if (check) check.onclick = () => {
        const r = compare(lay, p.strokes());
        if (!r) { status.textContent = '先用手指、触控笔或鼠标沿着虚线描一遍。'; return; }
        const pct = Math.round(r.cover * 100);
        if (r.cover >= 0.88 && r.stray <= 0.12) {
          status.textContent = '✓ 描得很好！再切换到「自己写」，不看虚线写一遍。'; p.showMissed([]);
          done.add(word); host.querySelector(`.hw-chip[data-i="${items.indexOf(word)}"]`)?.classList.add('done');
        } else if (r.stray > 0.25) {
          status.textContent = '写到虚线外面的太多了。放慢一点，沿着虚线描。';
        } else if (r.cover >= 0.6) {
          status.textContent = `已描到 ${pct}%。红点处还没描到，补上后再检查。`; p.showMissed(r.missed.filter((_, i) => i % 3 === 0));
        } else {
          status.textContent = `只描到 ${pct}%。先点「▶ 看笔顺」，再一笔一笔描。`; p.showMissed(r.missed.filter((_, i) => i % 3 === 0));
        }
      };
      const cmp = pane.querySelector('[data-compare]');
      if (cmp) cmp.onclick = () => {
        if (!p.strokes().length) { status.textContent = '先在下面的格子里写一遍，再和范字对照。'; return; }
        const on = padBox.classList.toggle('show-compare'); cmp.setAttribute('aria-pressed', String(on));
        status.textContent = on ? '红色是范字：看看字母的高低、倾斜和连笔是否一致。' : '';
      };
      cleanup = () => { ro.disconnect(); p.stop(); modelSvg._cwStop?.(); };
      if (autoplay) play();
    }
    function quiz(pane) {
      let score = 0, asked = 0;
      const ask = () => {
        const w = quizPool[Math.floor(Math.random() * quizPool.length)];
        // Distractors of similar length are harder to tell apart by shape alone.
        const near = quizPool.filter(x => x !== w).sort((a, b) => Math.abs(a.length - w.length) - Math.abs(b.length - w.length)).slice(0, 8);
        const options = shuffle([w, ...shuffle(near).slice(0, 3)]);
        const row = rowSvg(layout(w), {ink: 'model'});
        pane.innerHTML = `<p class="hw-cue">下面手写的是哪个词？</p><div class="hw-rowbox" data-model>${row.html}</div><div class="practice-options">${options.map(o => `<button type="button" lang="${lang}">${esc(o)}</button>`).join('')}</div><p class="study-status" role="status">${asked ? `已答对 ${score} / ${asked}` : ''}</p><div class="hw-actions"><button type="button" data-next hidden>下一个 →</button></div>`;
        const box = pane.querySelector('[data-model]'), status = pane.querySelector('[role=status]'), next = pane.querySelector('[data-next]');
        const ro = new ResizeObserver(() => fitRow(box, row)); ro.observe(box); fitRow(box, row);
        cleanup = () => ro.disconnect();
        let first = true;
        pane.querySelectorAll('.practice-options button').forEach(b => b.onclick = () => {
          if (b.textContent === w) {
            if (first) score++; asked++;
            b.classList.add('correct'); pane.querySelectorAll('.practice-options button').forEach(x => x.disabled = true);
            status.textContent = `✓ 对了！已答对 ${score} / ${asked}`; next.hidden = false; next.focus();
          } else {
            if (first) { first = false; }
            b.disabled = true; b.classList.add('wrong'); status.textContent = '不是这个。注意看每个字母的形状，再试一次。';
          }
        });
        next.onclick = () => { cleanup(); ask(); };
      };
      ask();
    }
  }

  window.KZCursive = {glyphs: G, layout, rowSvg, animate, supported, wordsOf, panel};
})();
