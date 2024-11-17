import { useState } from 'react';

export default function Player({
  initialName,
  symbol,
  isActive,
  onPlayerNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onPlayerNameChange(symbol, name);
    }
  }
  function handleNameChange(event) {
    // console.log(event);
    // console.log(event.target.value);
    setName(event.target.value);
  }
  let playerName = <span className='player-name'>{name}</span>;
  let buttonName = 'Edit';

  if (isEditing) {
    playerName = (
      <input
        type='text'
        required
        value={name}
        onChange={handleNameChange}
      ></input>
    );
    buttonName = 'Save';
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {playerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonName}</button>
    </li>
  );
}
