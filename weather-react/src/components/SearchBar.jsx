import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSearch(text.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">City</label>
      <input id="city" placeholder="e.g. Beirut" value={text}
        onChange={e => setText(e.target.value)} />
      <button>Search</button>
    </form>
  );
}
