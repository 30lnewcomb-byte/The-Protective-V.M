# Android Guest Feasibility Test

Date: 2026-10-11

## Result

**Partial success; not ready to run apps.** QEMU launched an Android-x86 9.0 live image in the Vercel Sandbox using software emulation (TCG) without KVM. The guest displayed the Android boot logo, but did not reach a confirmed Android home screen during the test window. RCFPVPro has not been installed or tested.

## Environment

- Vercel Sandbox, Ubuntu 26.04.1 LTS, amd64
- 2 vCPUs, 4 GiB RAM
- QEMU system x86 package from Ubuntu repositories
- Android-x86 9.0-r2 ISO from the Android-x86 SourceForge project
- ISO SHA-256: `f7eb8fc56f29ad5432335dc054183acf086c539f3990f0b6e9ff58bd6df4604e`
- QEMU machine: `pc,accel=tcg`
- Guest RAM: 2048 MiB; guest CPUs: 2
- Guest networking: disabled with QEMU `-net none`
- Sandbox outbound access: custom allowlist for Ubuntu package repositories and Android-x86 download domains
- No `/dev/kvm` or guest network connection was used.

## Observations

- QEMU and the Android-x86 ISO downloaded successfully.
- The live boot menu appeared and the default live-boot entry was selected.
- After approximately 45 seconds, OCR of the captured guest display still detected only the word `android`, consistent with the boot logo rather than a usable desktop.
- QEMU was using substantial CPU under software emulation. This is a performance and compatibility warning, not proof that Android-x86 cannot boot with different graphics or kernel options.
- The sandbox was stopped after the test; it is not a persistent Android host.

## Next debugging steps

1. Re-test with Android-x86's advanced/debug boot entry and capture kernel logs.
2. Try a boot option such as `nomodeset` to check whether the virtual graphics path is the blocker.
3. If a usable desktop boots, test ADB/app installation and determine whether RCFPVPro supports x86_64 or requires ARM translation.
4. Only after boot/app compatibility is demonstrated, design and independently verify the network enforcement and cutoff.

## Safety boundary

This was an offline guest boot test only. No physical drone was connected, no drone app traffic was generated, and no firewall-enforcement claim is made. The web dashboard remains a status/preview interface, not the virtual machine or a working firewall.
