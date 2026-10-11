# Roadmap

This roadmap separates feasibility checks from implementation. Items are not complete until they have been tested and the evidence is recorded.

## Phase 1 — Host and Android feasibility
- [ ] Confirm the host OS, virtualization support, available RAM, and disk space.
- [ ] Evaluate AOSP Cuttlefish requirements against the actual host.
- [ ] Compare Android-x86 and Bliss OS only if Cuttlefish is unsuitable.
- [ ] Confirm the guest can display in a landscape, desktop-sized window.
- [ ] Keep the drone and its Wi-Fi disconnected.

## Phase 2 — Network enforcement prototype
- [ ] Choose a host-level or isolated-VM network gate.
- [ ] Start with deny-all outbound policy.
- [ ] Create a synthetic test client and mock destinations.
- [ ] Verify allow, deny, logging, and deny-all cutoff behavior.
- [ ] Verify the gate remains restrictive when the monitor is stopped.

## Phase 3 — App observation
- [ ] Install RCFPVPro only inside the disposable Android guest after the baseline is isolated.
- [ ] Record observable process and network metadata.
- [ ] Document which signals are unavailable or obscured.
- [ ] Have Ori summarize events without controlling enforcement policy.

## Phase 4 — Console and supervision
- [ ] Show guest, monitor, and gate health separately.
- [ ] Add policy review and change history.
- [ ] Add an emergency cutoff with gate-confirmed status.
- [ ] Test crash and reboot behavior.

## Phase 5 — Compatibility research
- [ ] Identify the drone model or board markings where possible.
- [ ] Research RCFPVPro-compatible controller projects without assuming compatibility.
- [ ] Evaluate a local drone bridge only after isolation tests pass.
- [ ] Test against a mock endpoint before considering any physical connection.

## Phase 6 — Controlled physical test
This phase is intentionally blocked until all earlier security tests are documented and reviewed. Enable only the minimum necessary connection, keep home-LAN access denied, and retain an immediate independent cutoff.
