
import { Collapsible } from '@/components/Collapsible';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";

export default function HolidayScreen() {
  return (
    <>
      <Link href='/' style={GlobalStyles.content}>
        <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
        Holiday's
      </Link>

      <Collapsible title="collapsible content">
        <div>text</div>
      </Collapsible>

    </>
  );
}
