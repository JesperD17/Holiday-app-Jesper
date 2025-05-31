import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";

export default function AboutScreen() {
    return (
        <>
            <Link href='/' style={GlobalStyles.content}>
                <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
                About
            </Link>
            <div>text</div>
        </>
    );
}