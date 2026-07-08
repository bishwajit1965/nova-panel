import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";

const NotificationForm = ({
  onFormSubmit,
  formData,
  onHandleChange,
  noticeToUpdate,
  onCancel,
  errors,
}) => {
  return (
    <div>
      <h1 className="lg:text-xl font-extrabold">
        {noticeToUpdate ? "Updata Notice" : "Create Notice"}
      </h1>
      <form onSubmit={onFormSubmit} className="space-y-2 text-base-content/70">
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-2 w-full">
          <div className="lg:col-span-6 col-span-12">
            <Input
              label="Key"
              name="key"
              placeholder="Key..."
              value={formData?.key}
              onChange={onHandleChange}
              error={errors?.key}
              className="w-full"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Input
              label="module"
              name="module"
              placeholder="Module..."
              value={formData?.module}
              onChange={onHandleChange}
              error={errors?.module}
              className="w-full"
            />
          </div>
        </div>

        <Input
          label="Authority"
          name="authority"
          placeholder="Authority..."
          value={formData?.authority}
          onChange={onHandleChange}
          error={errors?.authority}
          // readOnly
        />

        <Input
          label="Title"
          name="title"
          placeholder="Title..."
          value={formData?.title}
          onChange={onHandleChange}
          error={errors?.title}
        />
        <Textarea
          label="Message"
          name="message"
          placeholder="Message..."
          value={formData?.message}
          onChange={onHandleChange}
          error={errors?.message}
        />
        <div className="">
          <label htmlFor="info" className="text-gray-400 text-sm">
            Type
          </label>
          <select
            onChange={onHandleChange}
            name="type"
            value={formData?.type}
            id="type"
            className="select w-full"
          >
            {["info", "success", "warning", "error"].map((nt, index) => (
              <option key={index} value={nt}>
                {nt}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label htmlFor="category" className="text-gray-400 text-sm">
            Notice Category
          </label>
          <select
            onChange={onHandleChange}
            name="category"
            value={formData?.category}
            id="category"
            className="select w-full"
          >
            {[
              "general",
              "announcement",
              "event",
              "policy",
              "maintenance",
              "update",
              "alert",
              "other",
            ].map((nc, index) => (
              <option key={index} value={nc}>
                {nc}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label htmlFor="priority" className="text-gray-400 text-sm">
            Notice Priority
          </label>
          <select
            onChange={onHandleChange}
            name="priority"
            value={formData?.priority}
            id="priority"
            className="select w-full"
          >
            {["low", "normal", "high", "critical"].map((np, index) => (
              <option key={index} value={np}>
                {np}
              </option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-2">
          <div className="lg:col-span-4 col-span-12">
            <Input
              onChange={onHandleChange}
              name="scheduledAt"
              value={formData?.scheduledAt}
              type="datetime-local"
              label="Schedule Publish"
            />
          </div>

          <div className="lg:col-span-4 col-span-12">
            <Input
              onChange={onHandleChange}
              name="expiresAt"
              value={formData?.expiresAt}
              type="datetime-local"
              label="Will expire on"
            />
          </div>

          <div className="lg:col-span-4 col-span-12">
            <label htmlFor="status" className="text-gray-400 text-sm">
              Status
            </label>
            <select
              onChange={onHandleChange}
              name="status"
              value={formData?.status}
              id="status"
              className="select w-full"
            >
              {["draft", "published"].map((ns, index) => (
                <option key={index} value={ns}>
                  {ns}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 py-4">
          <Button
            size="sm"
            variant="primary"
            icon={noticeToUpdate ? LucideIcon.Edit : LucideIcon.UploadCloud}
          >
            {noticeToUpdate ? "Update Notice" : "Create Notice"}
          </Button>
          {noticeToUpdate && (
            <Button
              onClick={onCancel}
              icon={LucideIcon.RefreshCcw}
              size="sm"
              variant="warning"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
