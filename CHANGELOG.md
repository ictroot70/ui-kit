# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

## [Unreleased]
### Added
- 

### Changed
- 

### Fixed
- 

### Breaking
- 

## [2.0.0-beta.2] - 2026-03-20
### Added
- Pagination molecule with smart page range, interactive ellipsis jump, and items-per-page selector.

### Changed
- Unified Select usage in Pagination on top of v2 `Select`.
- Removed legacy `Select-box` molecule and related exports.
- Select styling API aligned to slot classes with backward-compatible class aliases.

### Fixed
- Pagination focus-visible colors aligned to primary tokens.
- Pagination select spacing and icon alignment for 50px trigger width (including `100` value case).
- Select/pagination style tokens moved to shared global tokens.

## [1.0.5] - 2026-02-08
### Fixed
- Select: stabilized viewport overflow behavior for ScrollArea integration.
- Select: exported select item/props types for safer imports in consumers.

[Unreleased]: https://github.com/ictroot70/ui-kit/compare/v2.0.0-beta.2...HEAD
[2.0.0-beta.2]: https://github.com/ictroot70/ui-kit/releases/tag/v2.0.0-beta.2
[1.0.5]: https://github.com/ictroot70/ui-kit/releases/tag/v1.0.5
