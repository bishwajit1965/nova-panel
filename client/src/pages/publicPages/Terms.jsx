import { LucideUser } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold border-b border-base-content/15 pb-2 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed opacity-80">
            By accessing or using this platform, you agree to be bound by these
            Terms. If you do not agree, you may not use the service.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p className="text-sm leading-relaxed opacity-80">
            You are responsible for maintaining the confidentiality of your
            account and all activities under your account.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
          <p className="text-sm leading-relaxed opacity-80">
            You agree not to misuse the platform, attempt unauthorized access,
            or engage in activities that harm the system or other users.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">4. Data & Privacy</h2>
          <p className="text-sm leading-relaxed opacity-80">
            We collect minimal data required to provide our services. Your data
            is not sold to third parties.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">5. Service Changes</h2>
          <p className="text-sm leading-relaxed opacity-80">
            We may update, modify, or discontinue features at any time without
            prior notice.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">6. Termination</h2>
          <p className="text-sm leading-relaxed opacity-80">
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
        </section>

        {/* Agreement Note */}
        <div className="p-4 bg-base-200 rounded-lg text-sm opacity-80">
          By continuing to use this application, you acknowledge that you have
          read and agree to these Terms.
        </div>

        {/* Footer */}
        <div className="lg:flex grid gap-2 lg:justify-between justify-center items-center pt-4 border-t border-base-content/15 text-sm">
          <Link to="/" className="hover:link link-primary">
            ← Back to Home
          </Link>

          <Link
            to="/register"
            className="btn btn-sm btn-primary flex items-center gap-2"
          >
            <LucideUser size={20} /> Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
