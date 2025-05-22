import styles from "@/module/ItemList.module.css";

function ItemList({ data }) {
  return (
    <div className={styles.container}>
      {data.length ? (
        <ul>
          {data.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ موردی ذکر نشده است</p>
      )}
    </div>
  );
}

export default ItemList;
