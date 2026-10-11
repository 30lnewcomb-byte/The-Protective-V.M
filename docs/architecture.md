# Architecture

## Design overview

The system is split into components with separate responsibilities. Monitoring and enforcement must not be the same control.

```text
Desktop Console
   | status / reviewed policy / emergency cutoff
   v
Host Supervisor -------------------- Event Log
   |                                     ^
   v                                     |
Android Guest --> Independent Network Gate
   |                    |                ^
   | app events         | allow / deny   |
   v                    v                |
Ori Safety Monitor ----- event summaries-
   
Future local drone bridge (disabled until safety tests pass)
```

This diagram is conceptual. It does not imply that these components have been implemented or connected.

## Components

### 1. Desktop console
- Show guest state, gate state, policy version, and recent events.
- Make the blocked/allowed state easy to understand.
- Offer a prominent emergency cutoff that asks the enforcement layer to block guest networking.
- Never report a successful cutoff until the gate confirms it.

### 2. Android guest
- Run the target app in a disposable, desktop-oriented Android environment.
- Prefer a snapshot/revert workflow so testing can return to a known state.
- Restrict guest access to host resources and local network peers.
- Evaluate AOSP Cuttlefish first; confirm host requirements and graphical usability before committing to it.

### 3. Host supervisor
- Start and stop the guest and gate.
- Check health and record lifecycle events.
- On loss of policy, gate health, or supervisor certainty, request or preserve a deny-all state.
- Keep credentials and host control sockets out of the Android guest.

### 4. Independent network gate
- Enforce policy outside the guest, where the guest app cannot simply disable it.
- Default to deny for outbound traffic.
- Use explicit destination, protocol, and port rules; record decisions.
- Expose a narrow control interface to the supervisor, not to the guest.
- Remain restrictive if the monitor crashes or sends invalid advice.

### 5. Ori Safety Monitor
- Analyze only signals the host can actually collect.
- Flag unusual destinations, repeated denied attempts, unexpected protocols, and policy changes.
- Explain why an event was flagged and how confident the assessment is.
- Never silently add allow rules or bypass the network gate.
- Clearly mark encrypted or otherwise unobservable traffic as unknown.

### 6. Future drone bridge
- Disabled during early development.
- Must have a separately reviewed allowlist and an explicit enable action.
- Must not bridge the Android guest to the home LAN.
- Must be tested with a mock endpoint before the physical drone is introduced.

## Data flow

1. The guest attempts a network connection.
2. The independent gate evaluates it against the current policy.
3. The gate allows or blocks it and records the decision.
4. The monitor may analyze available metadata and logs.
5. The console displays the actual gate decision, not an AI guess.

## Deployment caution

A remote web dashboard and a local Android VM are different pieces of infrastructure. Hosting a page on Vercel does not itself provide a persistent graphical Android emulator, nor does a cloud service automatically join the computer's local drone Wi-Fi. These are feasibility questions to validate separately.
