const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-base-100 dark:bg-base-content dark:text-white border border-base-content/10 shadow-md rounded-2xl p-5 transition-all hover:shadow-lg ${className}`}
  >
    {title && (
      <h2 className={`text-lg font-semibold mb-2 ${className}`}>{title}</h2>
    )}
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div
    className={`border-b border-base-content/10 dark:text-white pb-3 mb-3 ${className}`}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2
    className={`text-xl font-bold text-base-content/70 dark:text-white tracking-wide flex items-center gap-2 ${className}`}
  >
    {children}
  </h2>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`text-base-content/80 dark:text-white ${className}`}>
    {children}
  </div>
);

// ✅ Keep old behavior for existing imports
export default Card;

// Import it in in this way as Card has been singly used else where
// import Card, {
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../common/components/ui/Card";
