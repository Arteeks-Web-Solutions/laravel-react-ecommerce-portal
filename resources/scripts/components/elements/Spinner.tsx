export default function Spinner({ size = 6 }: { size?: number }) {
    return (
        <div
            className={`w-${size} h-${size} border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin`}
        ></div>
    );
}
