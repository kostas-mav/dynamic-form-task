import { Group } from '../../components/form-group/form-group.component';
import { Form } from '../../components/form/form.component';

export function sortFormGroupsByOrder(form: Form) {
  const updatedGroups: Group[] = form.groups.map((group) => {
    const orderedControls = group.controls.filter(
      (obj) => obj.order !== undefined
    );

    if (orderedControls.length) {
      orderedControls.sort((a, b) => (a.order as number) - (b.order as number));
    }

    const unorderedControls = group.controls.filter(
      (obj) => obj.order === undefined
    );

    return {
      ...group,
      controls: orderedControls.concat(unorderedControls),
    };
  });

  const updatedForm: Form = {
    ...form,
    groups: updatedGroups,
  };

  return updatedForm;
}
