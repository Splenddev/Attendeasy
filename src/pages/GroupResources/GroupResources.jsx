import styles from './GroupResources.module.css';

const GroupResources = () => {
  return (
    <div className={styles.groupResources}>
      <header>
        <h1>group resources</h1>
        <button>Add resource</button>
      </header>
      <section className={styles.resourceCategory}></section>
    </div>
  );
};

export default GroupResources;
