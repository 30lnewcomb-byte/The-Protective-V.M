# Security model

## Assets to protect

- The host computer and its files.
- Home-network devices and credentials.
- The Android guest's state and logs.
- Network policy integrity.
- The ability to stop all guest networking quickly.
- The physical drone, which must remain disconnected until testing is complete.

## Threats considered

- The target app contacts unknown Internet hosts.
- The app attempts to discover or connect to local-network devices.
- The app generates unexpected traffic or repeatedly retries blocked connections.
- The Android guest or monitor crashes.
- The monitor misclassifies activity or produces a false reassurance.
- A policy update accidentally grants excessive access.
- A cloud dashboard is mistaken for a local network security boundary.

## Required controls

### Default-deny egress
No outbound flow is permitted unless a narrow rule explicitly allows it. Start with no allow rules except what is required to update and operate the isolated test environment, and document each exception.

### Local-network isolation
Block access from the guest to the host and other LAN devices by default. Do not expose host services to the guest. Do not enable bridging to the drone network during baseline tests.

### Independent cutoff
The gate must support a deny-all mode that is enforced outside Android. Test that the mode still works if the dashboard and Ori Safety Monitor are stopped.

### Auditable policy
Every allow rule should state its purpose, destination, protocol, port, and approval. Policy changes should be logged with timestamps and a clear before/after record.

### Honest monitoring
The monitor must distinguish observed facts from inferences. Encrypted payloads may not be readable; DNS may be encrypted or bypassed; traffic may use shared hosting or changing addresses. Do not claim that country-based IP filtering proves an endpoint is trustworthy.

### Least privilege
The guest gets no access to secrets, personal files, or unnecessary host devices. Keep control APIs narrow and inaccessible from the guest.

## Test plan before any physical connection

- [ ] With no allow rules, synthetic outbound attempts are blocked.
- [ ] An explicitly allowed test flow succeeds and is logged.
- [ ] An unlisted destination remains blocked.
- [ ] Attempts to reach host and LAN test addresses are blocked.
- [ ] Stopping the monitor does not weaken enforcement.
- [ ] Stopping the dashboard does not weaken enforcement.
- [ ] Losing or corrupting policy results in deny-all behavior.
- [ ] Emergency cutoff blocks a previously allowed synthetic flow and reports confirmation.
- [ ] Logs identify what was observed and what remains unknown.
- [ ] Rebooting the host does not accidentally start the guest with an open network policy.

Passing these tests is necessary but does not prove the environment is invulnerable. Keep the drone disconnected until the implementation and test results have been reviewed.
