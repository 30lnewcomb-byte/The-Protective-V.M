# The Protective V.M.

**The Protective V.M.** is an isolated desktop-sized Android testing environment for inspecting an unfamiliar drone-control app before it is allowed to communicate with a physical drone.

The first target is the Android app **RCFPVPro** and an unbranded toy drone whose exact model and compatibility are not yet confirmed. The project must not assume that the app, drone, or any replacement controller is compatible until evidence supports that conclusion.

## Core goals

- Run Android in a desktop-oriented workspace rather than a phone-shaped interface.
- Inspect app behavior before connecting the drone.
- Keep the Android guest isolated from the host and from ordinary home-network devices.
- Apply a **default-deny** network policy using an independent enforcement layer.
- Let the Ori Safety Monitor observe available activity and explain risks, while never treating AI judgment as the only security boundary.
- Provide a visible event log, clear connection status, and an obvious emergency network cutoff.
- Prefer open-source components and low-cost/local-first operation.

## Safety principles

1. **No drone connection during initial development.** Use synthetic traffic and a mock device to validate monitoring and cutoff first.
2. **Deny by default.** Unknown destinations and protocols stay blocked until explicitly reviewed and allowed.
3. **Independent enforcement.** The network gate must still block traffic if the monitor, dashboard, or Android guest crashes.
4. **Fail closed.** If the gate loses its policy or cannot determine whether a flow is allowed, it blocks the flow.
5. **No trust by geography alone.** Geo-IP filtering can be an extra signal, but it cannot establish who operates a server or whether it is safe.
6. **Be honest about visibility.** Encryption, guest limitations, and unsupported traffic may prevent the monitor from seeing content. Show uncertainty rather than inventing conclusions.
7. **Human approval for changes.** New destinations or broader permissions require explicit review.

## Proposed architecture

- **Desktop console:** A management interface for status, events, policy review, and emergency cutoff.
- **Android guest:** A virtual Android environment; AOSP Cuttlefish is the leading candidate to evaluate, not yet a confirmed fit.
- **Host supervisor:** Starts, stops, and health-checks the guest and supporting services.
- **Independent network gate:** Enforces allowlists and blocks unauthorized egress independently of the AI monitor.
- **Ori Safety Monitor:** Summarizes observable events and flags suspicious or out-of-policy behavior. It does not get to override the gate.
- **Future local drone bridge:** A separately controlled component, considered only after the isolated environment passes tests. A cloud-hosted console cannot join a drone's local Wi-Fi by itself.

See [Architecture](docs/architecture.md), [Security model](docs/security-model.md), and [Roadmap](docs/roadmap.md).

## Current status

**Planning and feasibility stage.** No Android image, firewall, app instrumentation, or physical-drone connection is claimed to be working yet. The next milestone is to prove that the selected Android environment can run on the intended host and that an independent network gate can block test traffic.

## Compatibility note

The open-source project [Volonid/e88pilot](https://github.com/Volonid/e88pilot) has been identified as a possible reference for certain RCFPVPro-compatible E88 Pro variants. Compatibility with this drone is unknown; it is a research lead, not an endorsed or confirmed controller.

## Development rule

Do not connect the physical drone or allow the app unrestricted networking until the isolation boundary, logging, and emergency cutoff have passed repeatable tests using synthetic traffic.
