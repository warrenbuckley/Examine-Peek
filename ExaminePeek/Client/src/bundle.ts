import { manifests as entryPointManifests } from './Entrypoints/manifests.ts';
import { manifests as entityActionManifests } from './Actions/Entity/manifests.ts';
import { manifests as modalManifests } from './Modals/manifests.ts';
import { manifests as localizationManifests } from './Localizations/manifests.ts';
import { manifests as userPermissionManifests } from './UserPermissions/manifests.ts';

// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...entryPointManifests,
  ...entityActionManifests,
  ...modalManifests,
  ...localizationManifests,
  ...userPermissionManifests
];
