export const routesNavigate = (path) => {
  window.location.href = path;
};
export const checkboxChange = (key, setState, state) => {
  setState((prev) => ({ ...prev, [key]: !prev[key] }));
  console.log(state);
};
export const onChoiceChange = (choice, checkedChoices, choiceMode, title, setValue) => {
  const current = { ...checkedChoices };

  if (choiceMode === 'multiple') {
    current[choice] = !current[choice];
  } else {
    Object.keys(current).forEach((key) => (current[key] = false));
    current[choice] = true;
  }

  setValue(`${title}_choices`, current);
};

export const select = (type, setValue, selected, list, getValues) => {
  if (type === 'selectOne') {
    const prev = getValues('students') || [];
    const updated =
      prev.includes(selected)
        ? prev.filter((name) => name !== selected)
        : [...prev, selected];

    setValue('students', updated);
  }

  if (type === 'select-all') {
    const prev = getValues('students') || [];
    const allSelected = list.every((student) => prev.includes(student.name));
    const updated = allSelected ? [] : list.map((student) => student.name);

    setValue('students', updated);
  }
};
