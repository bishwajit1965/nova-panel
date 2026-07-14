import { Input } from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import { Loader } from "lucide-react";
import Badge from "../../../components/ui/Badge";

export const ProfileAvatarForm = ({
  isPending,
  avatar,
  setAvatar,
  onCancel,
  formData,
  onAvatarUpdate,
  selectEdit,
  uploadProgress,
}) => {
  const { avatarUrl, name, email, roles } = selectEdit || {};
  return (
    <div>
      <form onSubmit={onAvatarUpdate} className="space-y-4">
        <div>
          <Input
            type="file"
            label="Upload Avatar"
            accept="image/*"
            value={formData?.avatarUrl}
            onChange={(e) => setAvatar(e.target.files[0])}
            className="file-input file-input-neutral w-full pl-0"
          />
        </div>

        <div className="flex lg:grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-2 justify-between">
          <div className="lg:col-span-6 col-span-12 space-y-2 border border-base-content/15 rounded-lg p-2 shadow-md hover:shadow-xl">
            {avatarUrl && (
              <div className="flex justify-center">
                <img
                  src={avatarUrl}
                  alt="preview"
                  className="lg:h-40 lg:w-40 w-28 h-28 rounded-full object-cover shadow-lg bg-base-300 p-0.5"
                />
              </div>
            )}
            <div className="text-gray-600 space-y-1">
              <h1 className="lg:text-lg text-sm font-bold">Current Avatar</h1>
              <p className="text-sm font-bold flex items-center gap-1">
                <LucideIcon.UserRoundCog size={10} /> {name}
              </p>
              <p className="lg:text-xs text-xs break-all flex items-center gap-1">
                <LucideIcon.Mail size={10} /> {email}
              </p>
              <p className="text-xs flex flex-wrap items-center gap-1">
                <LucideIcon.CreditCard size={12} />
                {roles?.map((r) => (
                  <Badge>{r?.name}</Badge>
                ))}
              </p>
            </div>
          </div>{" "}
          {avatar && (
            <div className="lg:col-span-6 col-span-12 space-y-2 border border-base-content/15 rounded-lg p-2 shadow-md hover:shadow-xl">
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="preview"
                  className="lg:h-40 lg:w-40 w-28 h-28 rounded-full object-cover shadow-lg bg-base-300 p-0.5"
                />
              </div>
              <div className="text-gray-600 space-y-1">
                <h1 className="lg:text-lg text-sm font-bold">New Avatar</h1>
                <p className="text-sm font-bold flex items-center gap-1">
                  <LucideIcon.UserRoundCog size={10} /> {name}
                </p>
                <p className="lg:text-xs text-xs break-all flex items-center gap-1">
                  <LucideIcon.Mail size={10} /> {email}
                </p>
                <p className="text-xs flex flex-wrap items-center gap-1">
                  <LucideIcon.CreditCard size={12} />
                  {roles?.map((r) => (
                    <Badge>{r?.name}</Badge>
                  ))}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="">
          {isPending && (
            <div className="my-4">
              <div className="flex justify-between text-xs text-base-content/70">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button size="xs" disabled={!avatar}>
            {isPending ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <LucideIcon.UploadCloud size={20} />
            )}
            {isPending ? "Uploading..." : "Update Avatar"}
          </Button>

          <Button
            size="xs"
            icon={LucideIcon.RefreshCcw}
            disabled={isPending}
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
