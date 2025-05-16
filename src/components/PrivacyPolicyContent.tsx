// src/components/content/PrivacyPolicyContent.tsx
import React from 'react';

const PrivacyPolicyContent = () => {
  return (
    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-mosaic-gray py-4" dir="rtl"> {/* Added prose for styling */}
      <h1 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
        سياسة الخصوصية لموقع Mosaic Team
      </h1>
      <p className="text-center text-xs mb-1">تاريخ السريان: 1 أيار 2025</p>
      <p className="text-center text-xs mb-6">آخر تحديث: 1 أيار 2025</p>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">1. المقدمة</h2>
          <p>
            نحن في Mosaic Team (“نحن” أو “الشركة”) نلتزم بحماية خصوصيتك ونحترم سرية معلوماتك. تشرح هذه السياسة بياناتك التي نجمعها وكيف نستخدمها ونحميها، وحقوقك المتعلقة بها عند تواصلك معنا عبر موقعنا الإلكتروني.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">2. البيانات التي نجمعها</h2>
          <p className="mb-1">البيانات التي يزوّدها المستخدم طوعاً:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>الاسم الكامل</li>
            <li>عنوان البريد الإلكتروني</li>
            <li>رقم الهاتف</li>
            <li>محتوى الرسالة في نموذج “تواصل معنا”</li>
          </ul>
          <p className="mt-3 mb-1">لا نجمع تلقائياً أي بيانات تقنية أو تتبع:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>لا نجمع عنوان IP</li>
            <li>لا نحفظ معلومات المتصفح أو نظام التشغيل</li>
            <li>لا نتابع الصفحات التي تزورها أو زمن الإقامة فيها</li>
            <li>لا نعتمد على مصدر الإحالة (Referral)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">3. كيفية استخدام البيانات</h2>
          <p>نستخدم البيانات التي تقدمها لنا فقط للأغراض التالية:</p>
          <ul className="list-disc list-inside space-y-1 pl-4 mt-1">
            <li>الرد على رسائلك واستفساراتك عبر نموذج التواصل.</li>
            <li>تقديم عروضنا وخدماتنا وتحديثاتنا المتعلقة بها.</li>
            <li>تحسين تجربة المستخدم وجودة خدماتنا بناءً على ملاحظاتك.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">4. الإفصاح للجهات الخارجية</h2>
          <p>لا نشارك بياناتك الشخصية مع أي جهة خارجية، باستثناء:</p>
          <ul className="list-disc list-inside space-y-1 pl-4 mt-1">
            <li>مزودي خدمات تقنية (مثل استضافة الموقع أو منصة البريد الإلكتروني) الذين يلتزمون بحماية بياناتك وفقاً لاتفاقيات سرية.</li>
            <li>الجهات القانونية عند طلبها بموجب القانون فقط.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">5. الكوكيز وتقنيات التتبع</h2>
          <p className="mb-1">كوكيز الضرورية: نستخدم فقط كوكيز عمل الموقع الأساسية (مثل حفظ حالة الجلسة)، ولا نعتمد على كوكيز تسويق أو كوكيز إعلان.</p>
          <p>لا تحتاج لتعطيل أي كوكيز تسويقية لأننا لا نستخدمها.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">6. تخزين وحفظ البيانات</h2>
          <p className="mb-1">نحتفظ بالبيانات التي تقدمها لمدة سنة واحدة من تاريخ استلامها، ثم نحذفها آلياً، ما لم تطلب حذفها قبل ذلك.</p>
          <p>نتخذ إجراءات أمنية مثل التشفير والنسخ الاحتياطي وتقييد وصول الموظفين للحفاظ على سرية بياناتك.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">7. حقوقك كمستخدم</h2>
          <p>لك الحق في:</p>
          <ul className="list-disc list-inside space-y-1 pl-4 mt-1">
            <li>الاطلاع على البيانات التي نحتفظ بها عنك.</li>
            <li>تصحيح أي خطأ في بياناتك الشخصية.</li>
            <li>حذف بياناتك أو طلب تقييد معالجتها.</li>
            <li>سحب الموافقة على التواصل (إن كنت من المشتركين).</li>
          </ul>
          <p className="mt-1">لممارسة هذه الحقوق، راسلنا عبر البريد: <a href="mailto:contact@mosaictm.com" className="text-mosaic-blue hover:underline">contact@mosaictm.com</a></p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">8. الأطفال والقُصر</h2>
          <p>موقعنا موجه لجميع الأعمار. إذا كنت قاصراً تحت 18 سنة يفضل استشارة ولي الأمر قبل مشاركة بياناتك معنا.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">9. تعديلات هذه السياسة</h2>
          <p>قد نقوم بتحديث هذه السياسة دورياً. سيظهر تاريخ آخر تحديث أعلى هذه الصفحة، وننصحك بمراجعتها بين الحين والآخر.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">10. التواصل بشأن الخصوصية</h2>
          <p>لأي استفسار أو طلب متعلق بخصوصيتك وبياناتك، يرجى التواصل معنا عبر:</p>
          <ul className="list-disc list-inside space-y-1 pl-4 mt-1">
            <li>البريد الإلكتروني: <a href="mailto:contact@mosaictm.com" className="text-mosaic-blue hover:underline">contact@mosaictm.com</a></li>
            <li>أو نموذج “تواصل معنا” في موقعنا</li>
          </ul>
          <p className="mt-3">نشكر ثقتك بـ Mosaic Team.</p>
          <p>نسعى دائماً لتقديم أفضل حلول البرمجيات مع أعلى معايير الخصوصية.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;