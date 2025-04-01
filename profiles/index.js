import { Router } from 'express';
const router = Router();
import profileController from './controller.js';

router.get('/', profileController.getAllProfiles);
router.get('/:id', profileController.getProfileById);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

router.post('/:id/experience', profileController.addExperience);
router.delete('/:id/experience/:exp', profileController.deleteExperience);

router.post('/:id/skills', profileController.addSkill);
router.delete('/:id/skills/:skill', profileController.deleteSkill);

router.put('/:id/information', profileController.updateInformation);

export default router;