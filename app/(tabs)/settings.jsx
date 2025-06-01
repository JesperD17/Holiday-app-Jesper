import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";

export default function SettingScreen() {
    return (
        <>
            <Link href='/' style={GlobalStyles.headers}>
                <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
                Setting's
            </Link>

            <div style={GlobalStyles.default}>
                <div>text</div>
            </div>
        </>
    );
}