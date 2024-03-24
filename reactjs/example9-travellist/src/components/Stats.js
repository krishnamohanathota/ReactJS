export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start packing your items</em>
      </footer>
    );
  }

  //Derived State
  const noOfItems = items.length;
  const noOfpackedItems = items.filter((item) => item.packed).length;

  return (
    <footer className="stats">
      <em>
        {noOfItems === noOfpackedItems
          ? "You have packed everything and ready to go"
          : `You have ${noOfItems} items in your list, and you have already packed
          ${noOfpackedItems} items`}
      </em>
    </footer>
  );
}
