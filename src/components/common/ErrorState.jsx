export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-small text-error">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-small font-semibold text-success underline">
          Try again
        </button>
      )}
    </div>
  );
}
