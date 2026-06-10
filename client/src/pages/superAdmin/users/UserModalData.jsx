import { LucideCreditCard, LucideMail } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Badge from "../../../components/ui/Badge";

const UserModalData = ({ isModalOpen, closeModal, user }) => {
  return (
    <div>
      <div className="">
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="lg:space-y-4 space-y-2">
              <div className="lg:flex grid items-center lg:gap-4 gap-2 text-base-content/80">
                <img
                  src={
                    user?.avatarUrl
                      ? user?.avatarUrl
                      : "https://i.ibb.co.com/1z7P2wJ/girl2.jpg"
                  }
                  alt={user?.name}
                  className="lg:w-24 lg:h-24 h-12 w-12 rounded-full"
                />
                <div className="space-y-2">
                  <h1 className="lg:text-xl text-lg font-extrabold">
                    {user?.name}
                  </h1>
                  <p className="flex items-center gap-2 text-sm">
                    <LucideMail size={15} /> {user?.email}
                  </p>
                  <p className="text-sm font-bold flex flex-wrap gap-1.5">
                    Roles:&nbsp;
                    {user?.roles?.map((r) => (
                      <Badge key={r._id}> {r?.name}</Badge>
                    ))}
                  </p>
                  <p className="text-sm font-bold flex items-center flex-wrap">
                    User Status:&nbsp;{" "}
                    {user?.isActive ? (
                      <Badge color="green">Active</Badge>
                    ) : (
                      <Badge color="red">Inactive</Badge>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-base-content/80 text-sm space-y-2">
                <h2 className="text-lg font-extrabold border-b border-base-content/15">
                  User Plan Details
                </h2>

                <p className="font-bold flex items-center gap-2">
                  <LucideCreditCard size={15} />
                  {user?.plan?.name || "No Plan"} plan
                </p>
                <p className="font-bold">
                  Price:{" "}
                  {user?.plan?.price != null
                    ? `$${user.plan.price.toFixed(2)}`
                    : "No Price"}
                </p>

                <p className="font-bold">
                  Duration in days:{" "}
                  {user?.plan?.durationInDays || "No duration"}
                </p>
                <p className="text-sm">
                  {user?.plan?.description || "No Plan"}
                </p>
                <p className="flex flex-wrap gap-1.5">
                  Features:&nbsp;
                  {user?.plan?.features?.map((f) => (
                    <Badge key={f}>{f}</Badge>
                  ))}
                </p>
                <p className="font-bold">
                  Package Type: {user?.plan?.packageType}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default UserModalData;
