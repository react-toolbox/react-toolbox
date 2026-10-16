# Releasing the component source

React Toolbox ships editable source through the shadcn registry. The workspace package is private. A release does not publish an npm package.

## Before tagging

1. Update `packages/react-toolbox/package.json` to a new semantic version. Never reuse a release version.
2. Write `docs/releases/<version>.md`. Describe user-visible changes, migration steps and any known limitations. Record changes to installed paths and props explicitly.
3. Run `pnpm check`, `pnpm test:browser`, `TOOLBOX_BROWSER=webkit pnpm test:browser`, and `pnpm test:registry:install`. The standard test suite includes registry, style, and release snapshot verification. The installation check creates independent Next.js and Vite projects, uses the real shadcn CLI, and checks coexistence with an official shadcn Button and source overwrite behavior.
4. Complete the manual accessibility checks in `docs/accessibility.md` for keyboard operation, zoom, high contrast and a real screen reader. Automated checks do not establish screen-reader usability.
5. Build the production documentation and verify its HTTPS registry with `pnpm --filter react-toolbox verify:deployment https://react-toolbox.io`. The live registry and documentation must correspond to the intended release commit.
6. Commit the source, lockfile and notes. Create and push `v<version>` only when ready to publish. For example, a package version `3.0.0-next.0` requires tag `v3.0.0-next.0`.

The Source release workflow verifies the tag/version match, runs the complete checks on Chromium and WebKit, and runs actual consumer installations. It then creates a draft GitHub release, uploads all snapshot assets and publishes the release. Tags containing `-` create a prerelease. If an asset upload fails, the release remains a draft. Existing releases are never overwritten by the workflow; investigate a failed draft rather than deleting and recreating an already published release.

## What the snapshot records

`pnpm --filter react-toolbox release:snapshot` creates `packages/react-toolbox/dist/releases/v<version>/`. Commit the distribution source, registry configuration, package/lockfile manifests, snapshot scripts and versioned release notes first. The command refuses modified, staged, untracked or ignored files within these release inputs, so its recorded Git commit identifies the source being shipped. Unrelated work outside these inputs does not block a snapshot. An existing version tag must identify HEAD. The CLI does not accept a commit override.

The snapshot includes:

- Every component and foundation JSON payload plus `registry.json`.
- `manifest.json` with the source version, full Git commit, supported platform versions, public families and SHA-256 checksums for every payload and the notes.
- Release notes and installation instructions.
- `source-registry.tgz`, a reproducible archive of that same snapshot.

Every registry dependency points to a JSON asset in the **same tagged GitHub release**. Installing an old Button can never silently resolve its foundations from the current live registry. The snapshot verifier validates checksums, source provenance and dependency URLs; it rejects tampered or mismatched files.

Verify an extracted/downloaded snapshot using:

```sh
pnpm --filter react-toolbox exec node scripts/release-registry.mjs --verify /absolute/path/to/snapshot
```

Keep `source-registry.tgz` beside the extracted files when running this verification, because the verifier also checks that the archive contains those exact payloads. SHA-256 detects accidental modification; release authenticity still depends on the trusted repository/tag and HTTPS download.

## Installing or updating an exact release

The production URL installs the current source. Use a release asset URL to pin an application to a specific source release:

```sh
pnpm dlx shadcn@latest add https://github.com/react-toolbox/react-toolbox/releases/download/v3.0.0-next.0/button.json
```

These URLs become available when that release is published. Change the version and component name to the release you have reviewed.

Commit application changes before updating. Run `shadcn add <release-url> --diff` to inspect source differences without writing files. A normal `add` prompts before replacing changed files; decline an overwrite to retain local customizations. Merge the upstream changes into those files deliberately. `--overwrite` replaces source with the chosen release and is appropriate only after reviewing and preserving your customizations. Foundation files can be shared by several installed components, so review the complete dependency update together.

The CLI also updates dependencies and theme declarations. Declining a source-file overwrite is not a transaction rollback for the whole installation. Review `package.json`, the lockfile, global CSS and the full copied `material/` directory before committing.

## Rolling back

The most reliable rollback is to restore the application commit from before the update, including `package.json`, the lockfile, global CSS and copied source. This restores local customizations as well as the prior library version.

Alternatively, add the component URL from the previous tagged release and explicitly accept source overwrites after reviewing the diff. Restore dependency versions and host stylesheet changes from Git. The CLI does not delete files that disappeared between releases: remove obsolete files only after checking imports. Do not mix foundation files from different releases without testing the resulting installation.

To roll back the documentation/live registry, redeploy the previous verified Git commit in Vercel. Tagged GitHub snapshot URLs remain unchanged. Publishing a correction requires a new version and tag.
