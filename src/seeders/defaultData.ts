import { userService } from '../dao/User/service';

class DefaultDataSeeder {
   async run() {
      try {
         const superAdmin = await this.superAdmin();
         console.log('Default data seeded successfully:', superAdmin);
      } catch (error) {
         console.error('Error seeding default data:', error);
      }
      return true;
   }

   async superAdmin() {
      const superAdmin = await userService.createUser(
         'Super',
         'Admin',
         'superadmin',
         'info@javier-retondo.ar',
         '3512009913',
         true,
      );
      console.log('Super Admin created:', superAdmin);
      return superAdmin;
   }
}

export const defaultDataSeeder = new DefaultDataSeeder();
