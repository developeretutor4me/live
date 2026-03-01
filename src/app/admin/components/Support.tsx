import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupportCenter from '@/app/admin/components/support-center';
import OverviewMail from '@/app/admin/components/overview-mail';
import PersonalInbox from '@/app/admin/components/personal-inbox';
import ProfileDropdown from './ProfileDropdown';

export default function Home() {
  return (
    <main className="-mt-2">
      <Tabs defaultValue="support" className="w-full ">
        <TabsList className="grid w-full grid-cols-3 gap-x-5  max-w-[719px] p-0 bg-transparent absolute top-[18px] right-[24.1%] ">
          <TabsTrigger
            value="support"
            className="bg-[#968cc6] text-white data-[state=active]:bg-[#8653ff] data-[state=active]:text-white  text-[22.24px] font-medium py-2.5"
          >
            Support&nbsp;Center
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            className="bg-[#968cc6] text-white data-[state=active]:bg-[#8653ff] data-[state=active]:text-white  text-[22.24px] font-medium py-2.5"
          >
            Overview&nbsp;Mail
          </TabsTrigger>
          <TabsTrigger
            value="inbox"
            className="bg-[#968cc6] text-white data-[state=active]:bg-[#8653ff] data-[state=active]:text-white  text-[22.24px] font-medium py-2.5"
          >
            Personal&nbsp;Inbox
          </TabsTrigger>
        </TabsList>

        <TabsContent value="support">
          <SupportCenter />
        </TabsContent>
        <TabsContent value="overview">
          <OverviewMail />
        </TabsContent>
        <TabsContent value="inbox">
          <PersonalInbox />
        </TabsContent>
      </Tabs>
    </main>
  );
}
