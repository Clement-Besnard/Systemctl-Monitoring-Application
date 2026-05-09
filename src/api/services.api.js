const BASE = "/services";

export const getServices       = (state)        => fetch(`${BASE}${state ? `?state=${state}` : ""}`).then(r => r.json());
export const getFailedServices = ()             => fetch(`${BASE}/failed`).then(r => r.json());
export const getService        = (name)         => fetch(`${BASE}/${name}`).then(r => r.json());
export const getServiceStatus  = (name)         => fetch(`${BASE}/${name}/status`).then(r => r.json());
export const getServiceLogs    = (name, lines)  => fetch(`${BASE}/${name}/logs?lines=${lines ?? 50}`).then(r => r.json());
export const serviceAction     = (name, action) => fetch(`${BASE}/${name}/${action}`, { method: "POST" }).then(r => r.json());
export const createService     = (name, content) =>
  fetch(`${BASE}/${name}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) }).then(r => r.json());
export const deleteService     = (name) => fetch(`${BASE}/${name}`, { method: "DELETE" }).then(r => r.json());