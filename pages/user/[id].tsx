// Hook Next Js untuk provide detail url yang sedang diakses
import { useRouter } from 'next/router'

export default function UserDetail() {
    const router = useRouter();
    const userId = router.query.id;

    return <div>User: {userId}</div>
}