import './TagsSelect.css';

const TagsSelect = ({
  TAG_OPTIONS,
  selectedTags = [],
  onChange,
  setForm,
  name = 'tags',
  max = 3,
  label = 'Group Tags',
  hint = `(Maximum of ${max} tags)`,
}) => {
  const handleToggle = (tag) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : selectedTags.length < max
      ? [...selectedTags, tag]
      : selectedTags;

    // React Hook Form usage
    if (onChange) {
      onChange(updated);
    }

    // Non-RHF usage
    if (setForm) {
      setForm((prev) => ({
        ...prev,
        [name]: updated,
      }));
    }
  };

  return (
    <div className="tag-selector">
      <label>
        {label}
        <span className="tag-label-hint"> {hint} </span>
      </label>
      <div className="tag-selector-wrapper">
        <div className="tag-options">
          {TAG_OPTIONS.map((tag) => (
            <button
              type="button"
              key={tag}
              className={`tag-button ${
                selectedTags.includes(tag) ? 'selected' : ''
              }`}
              onClick={() => handleToggle(tag)}>
              {tag}
            </button>
          ))}
        </div>
        <p className="tag-counter">
          Selected {selectedTags.length}/{max}
        </p>
      </div>
    </div>
  );
};

export default TagsSelect;
