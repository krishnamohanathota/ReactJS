import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

/*
const items = [
  { id: 1, description: "Passport", quantity: 2, packed: true },
  { id: 2, description: "Charger", quantity: 2, packed: true },
];
*/

export default function App() {
  //Lift the State Up
  const [items, setItems] = useState([]);

  /*
  To add a new item to the existing items array in React using the useState hook, 
  you should not directly mutate the state variable. 
  Instead, you should create a new array with the updated items and 
  then set the state using the setItems function.
  */
  function handleAddItem(item) {
    /*
    This approach can lead to issues because the .push() method mutates the array 
    in place and doesn't return the new array, which violates React's immutability principle.
    */
    //setItems((c) ==> c.push(item))

    const updatedItems = [...items];
    updatedItems.push(item);
    setItems(updatedItems);
  }

  /*
  Delete the item from the list
  */
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  /*
    Mark item has packed
  */
  function handleToggleItem(id) {
    setItems((items) => {
      return items.map((item) => {
        // Check if the current item's id matches the specified itemId
        if (item.id === id) {
          // If matched, create a new object with the updated field
          return { ...item, packed: !item.packed };
        }
        // If not matched, return the original item unchanged
        return item;
      });
    });
  }

  /*
  Clear the items list
  */
  function handleClearItemss() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items ?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItemss}
      />
      <Stats items={items} />
    </div>
  );
}
