import RecurringDatePicker from '../components/RecurringDatePicker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Recurring Date Picker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create and visualize recurring date patterns with flexible scheduling options
          </p>
        </header>

        <RecurringDatePicker />
      </div>
    </div>
  );
}
