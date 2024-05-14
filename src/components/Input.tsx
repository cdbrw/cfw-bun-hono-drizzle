type InputProps = {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  type: 'text' | 'textarea' | 'password';
  hasBottomMargin?: boolean;
};

export default function Input({
  label,
  name,
  placeholder,
  required,
  type,
  hasBottomMargin = false,
}: InputProps) {
  return (
    <div class={hasBottomMargin ? 'mb-2' : undefined}>
      <label
        for={name}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      {type !== 'textarea' && (
        <input
          type={type}
          name={name}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required={required}
        />
      )}

      {type === 'textarea' && (
        <textarea
          rows={4}
          name={name}
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
