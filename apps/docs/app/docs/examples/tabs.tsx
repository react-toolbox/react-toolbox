'use client';
import { TabsRoot, TabsList, TabsTrigger, TabsIndicator, TabsContent } from 'react-toolbox/tabs';
import { Input } from 'react-toolbox/input';

function ProfileTab() {
  return <TabsTrigger value="profile">Profile</TabsTrigger>;
}
export default function TabsComposition() {
  return (
    <TabsRoot defaultValue="profile" activationMode="manual">
      <TabsList aria-label="Account settings">
        <ProfileTab />
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="profile" forceMount>
        <Input label="Persistent draft" defaultValue="Javi" />
      </TabsContent>
      <TabsContent value="notifications">Choose how you receive updates.</TabsContent>
      <TabsContent value="billing">Billing settings</TabsContent>
    </TabsRoot>
  );
}
