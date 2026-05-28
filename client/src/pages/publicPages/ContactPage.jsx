const ContactPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-4">
        If you have any questions, feedback, or inquiries about Nova Panel,
        please don't hesitate to reach out to us. We value your input and are
        here to assist you in any way we can.
      </p>
      <p className="text-lg mb-4">
        You can contact us through the following channels:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Email:
          <a href="mailto:info@novapanel.com">info@novapanel.com</a>
        </li>
        <li>Phone: +1 (123) 456-7890</li>
        <li>Address: 123 Main Street, City, State 12345</li>
      </ul>
    </div>
  );
};

export default ContactPage;
