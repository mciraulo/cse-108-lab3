export function OpButton({ label, onClick, isActive }) {
    return (
      <button
        className={`operate${isActive ? ' active' : ''}`}
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    )
  }