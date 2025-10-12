function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < value ? "gold" : "lightgray"}
          className="w-6 h-6"
          onClick={() => onChange(i + 1)}
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84 1.416 8.26L12 19.771l-7.416 4.079L6 15.59 0 9.75l8.332-1.595z" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
