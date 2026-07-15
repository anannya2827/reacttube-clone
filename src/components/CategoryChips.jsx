import './CategoryChips.css';

const categories = [
  'All',
  'New',
  'Music',
  'Gaming',
  'Live',
  'Education',
  'Coding',
  'Fitness',
  'Cooking',
  'Crafts',
  'Movies',
  'News',
  'Comedy',
  'Travel',
];

export default function CategoryChips({ activeCategory, onCategorySelect }) {
  return (
    <div className="category-chips">
      <div className="chips-scroll">
        {categories.map((category) => (
          <button
            key={category}
            className={`chip ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
