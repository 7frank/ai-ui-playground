

/**
 * This function installs the required packages using cmd-ts, bun, inquirer, zod, lodash-es, dayjs, and jest.
 * @param none
 * @returns none
 */
export function installRequiredPackages(): void {
  // Define the packages to be installed
  const packages: string[] = ['cmd-ts', 'bun', 'inquirer', 'zod', 'lodash-es', 'dayjs', 'jest'];

  // Install each package using cmd-ts
  packages.forEach((pkg) => {
    console.log(`Installing ${pkg} using cmd-ts`);
    cmdTs.install(pkg);
  });
}
