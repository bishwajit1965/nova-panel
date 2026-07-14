import { Loader, LucideEye, LucideEyeClosed } from "lucide-react";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Badge from "../../../components/ui/Badge";

const ResetProfilePasswordForm = ({
  onCancelPasswordReset,
  onSubmitHandlePasswordChange,
  // IS PENDING
  isPending,
  selectProfileUser,
  // NEW
  onToggleNewPassword,
  showNewPassword,
  // CONFIRM NEW
  onToggleConfirmNewPassword,
  showConfirmNewPassword,
  // ON CHANGE HANDLER LOADER
  onPasswordChange,
  // FORM FIELD VALUES
  formData,
  errors,
}) => {
  // DESTRUCTURES FIELDS FROM OBJECT
  const { name, email, avatarUrl, roles } = selectProfileUser || {};

  // PREVENTS ENABLE SUBMIT BUTTON UNTIL ALL INPUT FIELDS ARE FILLED
  const canSubmit =
    formData?.newPassword?.trim() && formData?.confirmPassword?.trim();

  return (
    <div>
      <form
        onSubmit={onSubmitHandlePasswordChange}
        className="space-y-2 border border-base-content/15 shadow-md hover:shadow-xl rounded-lg lg:p-6 p-2"
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="lex flex-wrap items-center gap-2">
            <img
              src={avatarUrl ? avatarUrl : ""}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border border-base-content/15 p-1 bg-base-300 shadow-md"
            />
          </div>
          <div className="text-gray-600 space-y-1">
            <h2 className="lg:text-medium text-sm font-bold flex items-center gap-2">
              <LucideIcon.UserRoundCog size={18} />
              <span className="">{` ${name} `}</span>{" "}
            </h2>
            <p className="lg:text-sm text-xs flex items-center gap-2">
              <LucideIcon.Mail size={16} />
              {`${email}`}
            </p>
            <p className="text-xs flex items-center gap-1">
              <LucideIcon.CreditCard size={20} />
              {roles?.map((r) => (
                <Badge>{r?.name}</Badge>
              ))}
            </p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="relative">
          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Sample: A.#122132.#Some."
            icon={LucideIcon.Lock}
            onChange={onPasswordChange}
            value={formData?.newPassword}
            error={errors?.newPassword}
          />
          <button
            type="button"
            className="absolute inset-y-11 right-0 flex items-center pr-3 cursor-pointer"
            onClick={onToggleNewPassword}
          >
            {showNewPassword ? (
              <LucideEyeClosed size={20} className="text-gray-300" />
            ) : (
              <LucideEye size={20} className="text-gray-300" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm New Password"
            type={showConfirmNewPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Sample: A.#122132.#Some"
            icon={LucideIcon.Lock}
            onChange={onPasswordChange}
            value={formData?.confirmPassword}
            error={errors?.confirmPassword}
          />
          <button
            type="button"
            className="absolute inset-y-11 right-0 flex items-center pr-3 cursor-pointer"
            onClick={onToggleConfirmNewPassword}
          >
            {showConfirmNewPassword ? (
              <LucideEyeClosed size={20} className="text-gray-300" />
            ) : (
              <LucideEye size={20} className="text-gray-300" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 py-4">
          <Button
            size="xs"
            variant="primary"
            disabled={!canSubmit || isPending}
          >
            {isPending ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <LucideIcon.KeyRound size={20} />
            )}
            {isPending ? "Processing" : "Change Password"}
          </Button>

          <Button
            onClick={onCancelPasswordReset}
            size="xs"
            icon={LucideIcon.RefreshCcw}
            variant="warning"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetProfilePasswordForm;
