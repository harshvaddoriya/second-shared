import Link from "next/link";


export default function Custom404() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>404 - Page Not Found</h1>
            <p className={styles.msg}>The page you are looking for does not exist.</p>
            <Link href="/">Go back home</Link>
        </div>
    );
}
