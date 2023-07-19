import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
	return (
		<div>
			<p className="text-6xl text-green-500">
				Landing Page UP
			</p>
			<UserButton afterSignOutUrl="/"/>
		</div>
	)
}


export default DashboardPage;