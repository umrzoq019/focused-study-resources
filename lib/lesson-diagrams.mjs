// Declarative teaching figures only: no HTML, scripts, URLs or remote assets.
const text = (value, limit) => typeof value === 'string' && value.trim() && value.length <= limit;
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
export function parseLessonDiagram(source) {
    if (typeof source !== 'string' || source.length > 12000) return null;
    let value; try { value = JSON.parse(source); } catch { return null; }
    if (!plain(value) || !text(value.title, 160) || value.caption != null && !text(value.caption, 700)) return null;
    const common = { type: value.type, title: value.title.trim(), caption: value.caption?.trim() || '' };
    if (value.type === 'flow') {
        if (!Array.isArray(value.steps) || value.steps.length < 2 || value.steps.length > 8 || value.steps.some(step => !plain(step) || !text(step.label, 100) || step.detail != null && !text(step.detail, 320))) return null;
        return { ...common, steps: value.steps.map(step => ({ label: step.label.trim(), detail: step.detail?.trim() || '' })) };
    }
    if (value.type === 'bits') {
        if (!Array.isArray(value.groups) || !value.groups.length || value.groups.length > 8 || value.groups.some(group => !plain(group) || !text(group.label, 120) || typeof group.bits !== 'string' || !/^[01]{1,32}$/.test(group.bits))) return null;
        return { ...common, groups: value.groups.map(group => ({ label: group.label.trim(), bits: group.bits })) };
    }
    if (value.type === 'logic') {
        const identifier = value => typeof value === 'string' && /^[A-Za-z][A-Za-z0-9_]{0,15}$/.test(value);
        if (!Array.isArray(value.inputs) || value.inputs.length < 1 || value.inputs.length > 4 || value.inputs.some(input => !identifier(input)) || new Set(value.inputs).size !== value.inputs.length || !Array.isArray(value.gates) || value.gates.length < 1 || value.gates.length > 8) return null;
        const known = new Set(value.inputs), gates = [];
        for (const gate of value.gates) {
            if (!plain(gate) || !identifier(gate.id) || known.has(gate.id) || !['AND','OR','NOT','NAND','NOR','XOR'].includes(gate.kind) || !Array.isArray(gate.sources) || gate.sources.length !== (gate.kind === 'NOT' ? 1 : 2) || gate.sources.some(source => !known.has(source))) return null;
            gates.push({id:gate.id,kind:gate.kind,sources:[...gate.sources]}); known.add(gate.id);
        }
        if (!gates.some(gate => gate.id === value.output)) return null;
        return {...common,inputs:[...value.inputs],gates,output:value.output};
    }
    return null;
}

/** Positions come from a bounded, topologically ordered circuit, never raw SVG. */
export function logicCircuitLayout(diagram) {
    const levels = new Map(diagram.inputs.map(input => [input,0]));
    for (const gate of diagram.gates) levels.set(gate.id,1+Math.max(...gate.sources.map(source => levels.get(source))));
    const columns = new Map();
    for (const [id,level] of levels) { if(!columns.has(level)) columns.set(level,[]); columns.get(level).push(id); }
    const height = Math.max(2,...[...columns.values()].map(column => column.length))*100+60;
    const positions = new Map();
    for(const [level,ids] of columns) ids.forEach((id,index)=>positions.set(id,{x:level===0?42:100+level*140,y:(index+1)*height/(ids.length+1)}));
    const width = 240 + Math.max(...levels.values())*140;
    return {positions,width,height};
}
