const faqs = [
  { q: 'How fast is delivery?', a: 'Most orders arrive within 24-48 hours depending on your location.' },
  { q: 'Do you ship nationwide?', a: 'Yes, we currently ship across the continental US.' },
  { q: 'What is your return policy?', a: 'Perishable items can be reported within 24 hours for a full refund.' },
  { q: 'Is everything certified organic?', a: 'All produce is sourced from certified organic farms.' },
];

export default function Faqs() {
  return (
    <div className="container-page py-16">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">Frequently Asked Questions</h1>
      <div className="max-w-2xl divide-y divide-gray-100">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer text-small font-medium text-gray-900">{f.q}</summary>
            <p className="mt-2 text-small text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
