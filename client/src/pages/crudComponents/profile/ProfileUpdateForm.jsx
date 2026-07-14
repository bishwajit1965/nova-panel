import { LucideIcon } from "../../../components/lib/LucideIcons";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

const ProfileUpdateForm = ({
  userProfileToEdit,
  onProfileUpdate,
  onCancel,
  onHandleChange,
  formData,
  errors,
}) => {
  const { avatarUrl, name, email, roles } = userProfileToEdit || {};
  return (
    <div>
      <form
        onSubmit={onProfileUpdate}
        className="space-y-2 border border-base-content/15 shadow-md hover:shadow-xl rounded-lg lg:p-6 p-2"
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="">
            <img
              src={avatarUrl ? avatarUrl : ""}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border border-base-content/15 p-1 bg-base-300 shadow-md"
            />
          </div>
          <div className="text-gray-600 space-y-1">
            <h2 className="lg:text-medium text-sm font-bold flex items-center gap-1">
              <LucideIcon.UserRoundCog size={18} />
              {name}
            </h2>
            <p className="lg:text-sm text-xs flex items-center gap-1 break-after-left">
              <LucideIcon.Mail size={16} />
              {email}
            </p>
            <p className="text-xs flex flex-wrap items-center gap-1">
              <LucideIcon.CreditCard size={20} />
              {roles?.map((r) => (
                <Badge>{r?.name}</Badge>
              ))}
            </p>
          </div>
        </div>
        <div className="divider"></div>
        <Input
          label="Name"
          icon={LucideIcon.User}
          name="name"
          placeholder="Name..."
          type="text"
          value={formData?.name}
          onChange={onHandleChange}
          error={errors?.name}
        />

        <Input
          type="email"
          label="Email"
          icon={LucideIcon.Mail}
          name="email"
          placeholder="Email..."
          type="text"
          value={formData?.email}
          onChange={onHandleChange}
          error={errors?.email}
        />

        <div className="flex items-center gap-2 pt-4">
          <Button size="xs" icon={LucideIcon.UploadCloud} variant="primary">
            Edit
          </Button>
          <Button
            size="xs"
            icon={LucideIcon.RefreshCcw}
            variant="warning"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
