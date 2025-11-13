function ItemList({ data }) {
  return (
    <div className="animate-fadeIn">
      {data.length ? (
        <ul className="list-disc pr-5 mb-12 marker:text-primary">
          {data.map((rule, index) => (
            <li key={index} className="text-gray-700 mb-2 leading-7">
              {rule}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center my-8">هیچ موردی ذکر نشده است</p>
      )}
    </div>
  );
}

export default ItemList;
